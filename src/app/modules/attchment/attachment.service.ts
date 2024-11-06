
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Attachment, IFile } from './attachment.model'
import path from 'path';
import { AttachmentListResponse, AttachmentResponse } from './attchment.interface';
/* @typescript-eslint/no-explicit-any */


const postAttachment = async (taskId: string, files: Express.Multer.File[]): Promise<IFile[]> => {
    const uploadedFiles: IFile[] = [];
  

    if (files && Array.isArray(files)) {
      files.forEach((file: Express.Multer.File) => {
      
        const fileUrl = `/uploads/attachments/${file.filename}`;
        const fileExtension = path.extname(file.originalname);
  
       
        const fileInfo = new Attachment({
          originalName: file.originalname,  
          extension: fileExtension,         
          filePath: fileUrl,               
          taskId: taskId,                 
        });
  
        uploadedFiles.push(fileInfo);
      });
  
      
      await Attachment.insertMany(uploadedFiles);
    }
  
    return uploadedFiles; 
  };


const getAttachmentByTaskId = async (taskId: string): Promise<AttachmentListResponse> => {
    const attachments = await Attachment.find({ taskId });

    if (attachments.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, `No files found for taskId: ${taskId}`);
    }

    // Map the attachments to match the AttachmentResponse type
    const fileList: AttachmentResponse[] = attachments.map((attachment) => ({
      originalName: attachment.originalName,
      extension: attachment.extension,
    }));

    // Return the response with the attachments and total count
    return {
      attachments: fileList,
      total: fileList.length,
    };
  };





export const AttachmentService = {
    postAttachment,
    getAttachmentByTaskId

}
