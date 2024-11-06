
import express from 'express';
import { attachmentUpload } from '../../middlewares/multer'; 
import { AttachmentController } from './attachment.controller';


const router = express.Router();


router.post('/upload', attachmentUpload, AttachmentController.postAttachment);

export const AttachmentRoute = router;
