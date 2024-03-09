import mysql from "mysql2/promise";

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
};

export const createDatabaseConnection = async () => {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('Database connection successfully established');
        const [rows] = await connection.execute('SELECT * FROM educatio_educat.mseng_studentbreakup WHERE id=4;');
        console.log(JSON.stringify(rows, null, 2)); // Log the rows in JSON format

        // Don't forget to close the connection when done
        await connection.end();
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

createDatabaseConnection();