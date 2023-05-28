import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = 'uploads/';
const FILE_INFOS_PATH = path.join(UPLOADS_DIR, 'fileInfos.json');

export function updateFileInfos(uid, text) {
  let fileInfos = JSON.parse(fs.readFileSync(FILE_INFOS_PATH));
  const fileIndex = fileInfos.findIndex((info) => info.uid === uid);
  
  if (fileIndex !== -1) {
    fileInfos[fileIndex].text = text;
    fs.writeFileSync(FILE_INFOS_PATH, JSON.stringify(fileInfos));
  }
}

export function removeFileInfo(uid) {
  let fileInfos = JSON.parse(fs.readFileSync(FILE_INFOS_PATH));
  fileInfos = fileInfos.filter((info) => info.uid !== uid);
  fs.writeFileSync(FILE_INFOS_PATH, JSON.stringify(fileInfos));
}