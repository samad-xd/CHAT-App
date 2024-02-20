import express from 'express';

import { isTokenValid, login, signup } from '../Controllers/authController.js';
import { upload, cloudinaryUpload } from '../Middlewares/upload.js';

const authRouter = express.Router();

authRouter.post('/signup', upload.single('image'), cloudinaryUpload, signup);

authRouter.post('/login', login);

authRouter.get('/auth', isTokenValid);

export default authRouter;