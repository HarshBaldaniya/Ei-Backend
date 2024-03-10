import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { dbConnection } from "../config/database.js"; // Update the path if necessary
import { UserRow } from '../helpers/interfaces.js'; // Update the path to where you store interfaces
import { SQL_QUERIES } from '../dal/auth.js'; // Update the path to where you store SQL queries

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, 'harshbaldniya134') as any; // Use a more secure way to store the secret

        const connection = await dbConnection();
        // Query the database for the user based on the username in the token
        const [rows] = await connection.execute(SQL_QUERIES.selectUserByUsername, [decoded.username]);
        const users = rows as UserRow[];

        if (users.length > 0) {
            const user = users[0];
            if (user.jwt === token) { // Check if the token matches the one stored in the database
                req.user = decoded;
                next();
            } else {
                return res.status(401).json({ message: 'Invalid Token' }); // Token mismatch
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
