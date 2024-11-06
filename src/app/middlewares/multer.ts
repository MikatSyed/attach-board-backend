// Backend: middleware/multer.ts
import multer from 'multer';

// Use memoryStorage to store files in memory (without saving them to disk)
const storage = multer.memoryStorage();

export const attachmentUpload = multer({ 
  storage,
}).array('attachments');  // This will handle multiple file uploads via the 'attachments' field
