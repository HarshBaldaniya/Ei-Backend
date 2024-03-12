import "dotenv/config";
import { Request, Response } from "express";
import { dbConnection } from "../config/database.js";
import jwt, {Secret} from "jsonwebtoken";
import { UserRow } from "../helpers/interfaces.js";
import { SQL_QUERIES } from "../dal/auth.js"; 
import { sendApiResponse } from "../utils/responseHandler.js"; 

export class textbook {
    static textbookHome = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Reached the textbook mapping page');
            res.send('Welcome to the textbook mapping page!');
        } catch (error: any) {
            console.error('Error fetching homePage:', error);
            sendApiResponse(res, 'error', 'homepageError'); 
        }
    }

    static login = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
        try {
            const secret = process.env.JWT_SECRET_KEY;
            const connection = await dbConnection();
            const [rows] = await connection.execute(SQL_QUERIES.selectUserByUsername, [username]);
            const users = rows as UserRow[];

            if (users.length > 0) {
                const user = users[0];
                if (user.password === password) {
                    // Generate a JWT
                    const token = jwt.sign({ username: user.username }, secret as Secret, { expiresIn: '24h' });
                    await connection.execute(SQL_QUERIES.updateUserJwtByUsername, [token, username]);
                    sendApiResponse(res, 'success', 'loginSuccess', { token });
                } else {
                    sendApiResponse(res, 'error', 'invalidCredentials');
                }
            } else {
                sendApiResponse(res, 'error', 'userNotFound');
            }
        } catch (error) {
            console.error('Login error:', error);
            sendApiResponse(res, 'error', 'loginError');
        }
    };
}
