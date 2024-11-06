import { Request, Response } from 'express';
import httpStatus from 'http-status'; 
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import {AttachmentService} from './attachment.service'
import { AttachmentListResponse } from './attchment.interface';

// Function to process the file upload request
const postAttachment = catchAsync(async (req: Request, res: Response) => {
  const taskId: string = req.body.taskId;  


  const uploadedFiles = await AttachmentService.postAttachment(taskId, req.files as Express.Multer.File[]);

  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Attachments uploaded successfully!',
    data: uploadedFiles,  
  });
});

const getAttachmentByTaskId = catchAsync(async (req: Request, res: Response) => {

  const { taskId } = req.params;

  const uploadedFiles:AttachmentListResponse = await AttachmentService.getAttachmentByTaskId(taskId);

  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Attachments retrieved successfully!',
    data: uploadedFiles,  
  });
});

export const AttachmentController = {
  postAttachment,
  getAttachmentByTaskId
};
