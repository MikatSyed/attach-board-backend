"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentUpload = void 0;
// Backend: middleware/multer.ts
const multer_1 = __importDefault(require("multer"));
// Use memoryStorage to store files in memory (without saving them to disk)
const storage = multer_1.default.memoryStorage();
exports.attachmentUpload = (0, multer_1.default)({
    storage,
}).array('attachments'); // This will handle multiple file uploads via the 'attachments' field
