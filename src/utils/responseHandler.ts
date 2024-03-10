import { Response } from "express";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "./responseMessages.js";
import { SuccessMessage, ErrorMessage } from "../helpers/interfaces.js";

export const sendApiResponse = (
    res: Response,
    type: 'success' | 'error',
    key: keyof SuccessMessage | keyof ErrorMessage,
    additionalData?: object
) => {
    if (type === 'success') {
        const message = SUCCESS_MESSAGES[key];
        res.status(message.statusCode).json({ success: true, message: message.message, ...additionalData });
    } else {
        const message = ERROR_MESSAGES[key];
        res.status(message.statusCode).json({ error: message.error, ...additionalData });
    }
};
