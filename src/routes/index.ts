import { Router } from "express";
import textbookRouter from "./textbookRoutes.js";

const router = Router();

router.use(textbookRouter);

export default router;