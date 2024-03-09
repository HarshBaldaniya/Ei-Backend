import "dotenv/config"
import mysql from "mysql2/promise";

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

export const dbConnection = async () => {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};