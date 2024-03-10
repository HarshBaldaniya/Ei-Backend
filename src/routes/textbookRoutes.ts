import {Router} from 'express';
import {textbook} from "../controllers/textbookController.js";
import {verifyJWT } from "../middleware/loginAuth.js";

const router = Router();

router.post('/textbook', verifyJWT, textbook.textbookHome)
router.post('/login', textbook.login)

export default router;