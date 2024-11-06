"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../middlewares/multer");
const attachment_controller_1 = require("./attachment.controller");
const router = express_1.default.Router();
router.post('/upload', multer_1.attachmentUpload, attachment_controller_1.AttachmentController.postAttachment);
router.get('/:taskId', attachment_controller_1.AttachmentController.getAttachmentByTaskId);
exports.AttachmentRoute = router;
