import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { dbConnection } from "../config/database.js"; 
import { UserRow } from '../helpers/interfaces.js'; 
import { SQL_QUERIES } from '../dal/auth.js'; 

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const secret = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secret as Secret) as any; 

        const connection = await dbConnection();
        const [rows] = await connection.execute(SQL_QUERIES.selectUserByUsername, [decoded.username]);
        const users = rows as UserRow[];

        if (users.length > 0) {
            const user = users[0];
            if (user.jwt === token) { 
                req.user = decoded;
                next();
            } else {
                return res.status(401).json({ message: 'Invalid Token' }); 
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
