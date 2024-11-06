"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginResponse = void 0;
const sendReponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
const sendLoginResponse = (res, response) => {
    res.status(response.statusCode).json({
        statusCode: response.statusCode,
        success: response.success,
        message: response.message,
        token: response.token,
    });
};
exports.sendLoginResponse = sendLoginResponse;
exports.default = sendReponse;
