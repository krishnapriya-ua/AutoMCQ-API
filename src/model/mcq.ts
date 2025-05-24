// src/models/Mcq.ts

import mongoose, { Document, Schema } from "mongoose";

export interface IMcq extends Document {
  sessionId: string;
  videoName: string;
  generatedText: string;
  createdAt: Date;
}

const McqSchema = new Schema<IMcq>({
  sessionId: { type: String, required: true },
  videoName: { type: String, required: true },
  generatedText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Mcq = mongoose.model<IMcq>("Mcq", McqSchema);
export default Mcq;
