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
const memory_cache_1 = __importDefault(require("memory-cache"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const attachment_model_1 = require("./attachment.model");
const path_1 = __importDefault(require("path"));
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
        // Insert files into the database
        yield attachment_model_1.Attachment.insertMany(uploadedFiles);
    }
    return uploadedFiles;
});
const getAttachmentByTaskId = (taskId, page = 1, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check cache first
        const cachedData = memory_cache_1.default.get(taskId);
        if (cachedData) {
            console.log('Cache hit');
            return cachedData; // Return cached result
        }
        console.log('Cache miss');
        // Fetch from the database if not cached
        const attachments = yield attachment_model_1.Attachment.find({ taskId })
            .skip((page - 1) * limit)
            .limit(limit);
        const fileList = attachments.map((attachment) => ({
            originalName: attachment.originalName,
            extension: attachment.extension,
        }));
        const total = yield attachment_model_1.Attachment.countDocuments({ taskId });
        const result = {
            attachments: fileList,
            total,
        };
        // Cache the result for 5 minutes
        memory_cache_1.default.put(taskId, result, 5 * 60 * 1000); // 5 minutes TTL
        return result;
    }
    catch (error) {
        console.error('Error fetching attachments:', error);
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error fetching attachments');
    }
});
exports.AttachmentService = {
    postAttachment,
    getAttachmentByTaskId,
};
