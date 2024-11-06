
import { Attachment, IFile } from './attachment.model'
import path from 'path';
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





export const AttachmentService = {
    postAttachment,

}
