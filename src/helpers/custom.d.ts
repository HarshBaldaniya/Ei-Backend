// Extend Express Request interface
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user: string;
        }
    }
}