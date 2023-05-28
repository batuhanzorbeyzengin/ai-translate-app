import fs from 'fs';

export async function transcribeFile(openai, filePath) {
  const response = await openai.createTranscription(
    fs.createReadStream(filePath),
    'whisper-1'
  );
  return response;
}
