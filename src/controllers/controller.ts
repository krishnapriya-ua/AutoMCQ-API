import { Request, Response, NextFunction } from 'express';
import { GoogleGenerativeAI, FileDataPart } from '@google/generative-ai';
import { GoogleAIFileManager, FileState } from '@google/generative-ai/server';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey)



const handleVideoUpload = (req: Request, res: Response, next:NextFunction):void => {
  if (!req.file) {
     res.status(400).json({ success: false, message: 'No video is there' });
     return;
  }
  console.log('File uploaded:', req.file.filename);
  res.status(200).json({
    message: 'Video uploaded successfully',
    filename: req.file.filename,
    success: true,
  });
};


const getText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("Received request to /text"); 
    if (!req.file || !req.file.path || !req.file.mimetype) {
      console.log("No video file provided or file data missing");
      res.status(400).json({ error: 'No video file provided or file data missing.' });
      return;
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    console.log(`Uploading file: ${req.file.filename}, MIME type: ${mimeType}`); 

   
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: req.file.filename,
    });
    console.log(`File uploaded to Gemini: ${uploadResponse.file.uri}`); 

    
    let file = await fileManager.getFile(uploadResponse.file.name);
    console.log(`Initial file state: ${file.state}`); 
    while (file.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
      file = await fileManager.getFile(uploadResponse.file.name);
      console.log(`File state: ${file.state}`); // Log file state during polling
    }
    if (file.state === FileState.FAILED) {
      console.log("Video processing failed in Gemini");
      throw new Error('Video processing failed.');
    }

   
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log("Generating content with Gemini"); // Log content generation
    const result = await model.generateContent([
      {
        fileData: {
          fileUri: uploadResponse.file.uri,
          mimeType: uploadResponse.file.mimeType,
        },
      },
      {
      text: `Transcribe the spoken content of this video into **English**, even if the original audio is in another language like Hindi. 
        Split the transcription into chunks of every 5 minutes (but only up to the video's total length). 
        For each 5-minute chunk, generate a few multiple-choice questions (each with 4 options and an answer key) **based strictly on that chunk**. `
      },
    ]);

    const response = await result.response;
    const text = response.text();
    console.log("Generated text:", text); 

    
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted local file: ${filePath}`); 
    } catch (err) {
      console.error('Failed to delete file:', err);
    }

    res.status(200).json({ text });
  } catch (error) {
    console.error('Error in getText:', error); 
    res.status(500).json({ error: 'Failed to generate text from video.' });
  }
};

export default {
  handleVideoUpload,
   getText
};
