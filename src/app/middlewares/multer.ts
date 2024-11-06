
import multer from 'multer';


const storage = multer.memoryStorage();

export const attachmentUpload = multer({ 
  storage,
}).array('attachments');  
