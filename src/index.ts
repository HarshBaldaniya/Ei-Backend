import express from "express";
import { createDatabaseConnection } from "./database.js";

const app = express();
app.use(express.json());

console.log(createDatabaseConnection);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`);
})
