import cache from 'memory-cache';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Attachment, IFile } from './attachment.model';
import path from 'path';
import { AttachmentListResponse, AttachmentResponse } from './attchment.interface';


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

    // Insert files into the database
    await Attachment.insertMany(uploadedFiles);
  }

  return uploadedFiles;
};



const getAttachmentByTaskId = async (
  taskId: string, 
  page: number = 1, 
  limit: number = 10
): Promise<AttachmentListResponse> => {
  try {
    // Check cache first
    const cachedData = cache.get(taskId);
    if (cachedData) {
      console.log('Cache hit');
      return cachedData;  // Return cached result
    }

    console.log('Cache miss');
    // Fetch from the database if not cached
    const attachments = await Attachment.find({ taskId })
      .skip((page - 1) * limit)
      .limit(limit);

    const fileList: AttachmentResponse[] = attachments.map((attachment) => ({
      originalName: attachment.originalName,
      extension: attachment.extension,
    }));

    const total = await Attachment.countDocuments({ taskId });

    const result: AttachmentListResponse = {
      attachments: fileList,
      total,
    };

    // Cache the result for 5 minutes
    cache.put(taskId, result, 5 * 60 * 1000);  // 5 minutes TTL

    return result;
  } catch (error) {
    console.error('Error fetching attachments:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching attachments');
  }
};


export const AttachmentService = {
  postAttachment,
  getAttachmentByTaskId,
};
