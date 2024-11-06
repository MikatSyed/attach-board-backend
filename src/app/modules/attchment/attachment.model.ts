
import mongoose, { Document, Schema, model } from 'mongoose';


export interface IFile extends Document {
  originalName: string;
  extension: string;
  filePath: string;
  taskId: string; 
}

const attachmentSchema = new Schema<IFile>(
  {
    originalName: { type: String, required: true },
    extension: { type: String, required: true },
    filePath: { type: String, required: true },
    taskId: { type: String, required: true }, 
  },
  {
    timestamps: true, 
  }
);

export const Attachment = model<IFile>('Attachment', attachmentSchema);
