// Backend: middleware/multer.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/attachment'); // Path to your directory
    
    // Ensure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir); // Use the created directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

export const attachmentUpload = multer({ 
  storage,
}).array('attachments'); 
