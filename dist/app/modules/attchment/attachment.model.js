"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const mongoose_1 = require("mongoose");
const attachmentSchema = new mongoose_1.Schema({
    originalName: { type: String, required: true },
    extension: { type: String, required: true },
    filePath: { type: String, required: true },
    taskId: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Attachment = (0, mongoose_1.model)('Attachment', attachmentSchema);
