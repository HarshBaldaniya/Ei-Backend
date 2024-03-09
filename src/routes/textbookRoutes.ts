import {Router} from 'express';
import {textbook} from "../controllers/textbookController.js";

const router = Router();

router.post('/textbook', textbook.textbookHome)

export default router;