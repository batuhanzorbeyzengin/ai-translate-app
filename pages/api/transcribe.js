import multer from 'multer';
import { Configuration, OpenAIApi } from "openai";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { transcribeFile } from '@/services/TranscribeFile';
import { updateFileInfos, removeFileInfo } from '@/services/FileInfo';

const UPLOADS_DIR = 'uploads/';
const FILE_INFOS_PATH = path.join(UPLOADS_DIR, 'fileInfos.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  upload.single('file')(req, res, async (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const uid = uuidv4();
    const fileInfo = {
      uid: uid,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: (req.file.size / 1e6).toFixed(2) + " MB",
    };

    let fileInfos = fs.existsSync(FILE_INFOS_PATH) ? JSON.parse(fs.readFileSync(FILE_INFOS_PATH)) : [];
    fileInfos.push(fileInfo);
    fs.writeFileSync(FILE_INFOS_PATH, JSON.stringify(fileInfos));

    try {
      const response = await transcribeFile(openai, req.file.path);
      fs.unlinkSync(req.file.path);

      if (response.status === 200) {
        updateFileInfos(uid, response.data.text);
      } else {
        removeFileInfo(uid);
      }

      res.status(200).json({data: response.data, id: fileInfo.uid});
    } catch (error) {
      removeFileInfo(uid);
      res.status(500).json({ error: error.message });
    }
  });
}
