"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentService = void 0;
const attachment_model_1 = require("./attachment.model");
const path_1 = __importDefault(require("path"));
/* @typescript-eslint/no-explicit-any */
const postAttachment = (taskId, files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = [];
    if (files && Array.isArray(files)) {
        files.forEach((file) => {
            const fileUrl = `/uploads/attachments/${file.filename}`;
            const fileExtension = path_1.default.extname(file.originalname);
            const fileInfo = new attachment_model_1.Attachment({
                originalName: file.originalname,
                extension: fileExtension,
                filePath: fileUrl,
                taskId: taskId,
            });
            uploadedFiles.push(fileInfo);
        });
        yield attachment_model_1.Attachment.insertMany(uploadedFiles);
    }
    return uploadedFiles;
});
const getAttachmentByTaskId = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const attachments = yield attachment_model_1.Attachment.find({ taskId });
    // Map the attachments to match the AttachmentResponse type
    const fileList = attachments.map((attachment) => ({
        originalName: attachment.originalName,
        extension: attachment.extension,
    }));
    // Return the response with the attachments and total count
    return {
        attachments: fileList,
        total: fileList.length,
    };
});
exports.AttachmentService = {
    postAttachment,
    getAttachmentByTaskId
};
