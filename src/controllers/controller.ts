import { Request, Response } from 'express';
// import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleVideoUpload = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No video is there' });
    return;
  }
  console.log('File uploaded:', req.file.filename);
  res.status(200).json({
    message: 'Video uploaded successfully',
    filename: req.file.filename,
    success: true
  });
};




// interface UploadedFile {
//   uri?: string;
//   mimeType ?: string;
//   // add other properties if needed
// }

// const getText = async (req: Request, res: Response): Promise<void> => {
//   try {
//     if (!req.file || !req.file.path || !req.file.mimetype) {
//       res.status(400).json({ error: "No video file provided or file data missing." });
//       return;
//     }

//     const filePath = req.file.path;
//     const mimeType = req.file.mimetype;
    

//     // Explicitly tell TypeScript what type to expect here:
//     const uploadedFile: UploadedFile = await ai.files.upload({
//       file: filePath,
//       config: { mimeType },
//     });

//     if (!uploadedFile.uri || !uploadedFile.mimeType) {
//   throw new Error("Upload failed: missing URI or mimeType");
// }

//     // Now uploadedFile.uri and uploadedFile.mimeType are guaranteed to be strings

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: createUserContent([
//         createPartFromUri(uploadedFile.uri, uploadedFile.mimeType),
//         "Summarize this video. Then create a quiz with an answer key based on the information in this video.",
//       ]),
//     });

//     res.status(200).json({ text: response.text });
//   } catch (error) {
//     console.error("Error in getText:", error);
//     res.status(500).json({ error: "Failed to generate text from video." });
//   }
// };









export default {
  handleVideoUpload,
  // getText
};
