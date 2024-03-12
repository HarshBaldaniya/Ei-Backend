import { SuccessMessage, ErrorMessage } from "../helpers/interfaces.js";

export const STATUS_CODES = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    internalServerError: 500,
};

export const SUCCESS_MESSAGES: SuccessMessage = {
    loginSuccess: { success: true, message: 'Login successful', statusCode: STATUS_CODES.success },
    
};

export const ERROR_MESSAGES: ErrorMessage = {
    invalidCredentials: { error: 'Invalid credentials', statusCode: STATUS_CODES.unauthorized },
    userNotFound: { error: 'User not found', statusCode: STATUS_CODES.notFound },
    loginError: { error: 'An error occurred during login. Please try again later.', statusCode: STATUS_CODES.internalServerError },
};