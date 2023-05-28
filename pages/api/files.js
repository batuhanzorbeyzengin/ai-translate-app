import fs from 'fs';
import path from 'path';

// Create a helper function to handle errors
const handleError = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
}

export default async function handler(req, res) {
  const fileInfoPath = path.join('uploads', 'fileInfos.json');
  let fileInfos = [];

  try {
    if (fs.existsSync(fileInfoPath)) {
      const existingFileInfos = fs.readFileSync(fileInfoPath);
      fileInfos = JSON.parse(existingFileInfos);
    }
  } catch (err) {
    return handleError(res, 500, 'Error occurred while reading file info.');
  }

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      return handleGETRequest(id, fileInfos, res);

    case 'DELETE':
      return handleDELETERequest(id, fileInfos, res, fileInfoPath);

    default:
      return handleError(res, 405, 'Method not supported');
  }
}

function handleGETRequest(id, fileInfos, res) {
  if (id) {
    const fileInfo = fileInfos.find(fileInfo => fileInfo.uid === id);
    if (fileInfo) {
      res.status(200).json(fileInfo);
    } else {
      handleError(res, 404, 'No file info found with that ID.');
    }
  } else {
    res.status(200).json(fileInfos);
  }
}

function handleDELETERequest(id, fileInfos, res, fileInfoPath) {
  if (id) {
    const initialLength = fileInfos.length;
    fileInfos = fileInfos.filter(fileInfo => fileInfo.uid !== id);

    if (initialLength === fileInfos.length) {
      handleError(res, 404, 'No file info found with that ID to delete.');
    } else {
      try {
        fs.writeFileSync(fileInfoPath, JSON.stringify(fileInfos, null, 2));
        res.status(200).json({ message: `File info with id: ${id} was deleted successfully` });
      } catch (err) {
        handleError(res, 500, 'Error occurred while writing to file.');
      }
    }
  } else {
    handleError(res, 400, 'No ID was provided to delete.');
  }
}
