export interface UserRow {
    username: string;
    password: string;
    jwt?: string;
}

export interface SuccessMessage {
    [key: string]: {
        success: boolean;
        message: string;
        statusCode: number;
    };
}

export interface ErrorMessage {
    [key: string]: {
        error: string;
        statusCode: number;
    };
}