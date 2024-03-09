import "dotenv/config";
import express from "express";
import { dbConnection } from "./config/database.js";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

dbConnection().then(() => {
    console.log('Database connection successfully established');

    app.listen(PORT, () => {
        console.log(`schoolSite service is running on ${PORT}`);
    })

    app.use(router);
}).catch(err => {
    console.error('Database connection failed:', err);
    throw err;
})
