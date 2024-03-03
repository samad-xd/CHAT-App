import express from 'express';

import { addImage, addMessage, deleteChat, getAllFriends, getChat, getMessages, messageAI } from '../Controllers/chatController.js';
import isAuth from '../Middlewares/auth.js';
import { cloudinaryUpload, upload } from '../Middlewares/upload.js';

const chatRouter = express.Router();

chatRouter.get('/all', isAuth, getAllFriends);

chatRouter.get('/:friendId' , isAuth, getChat);

chatRouter.get('/message/:chatId', isAuth, getMessages);

chatRouter.post('/message/send', isAuth, addMessage);

chatRouter.post('/message/send/AI', isAuth, messageAI);

chatRouter.post('/message/image', isAuth, upload.single('image'), cloudinaryUpload, addImage);

chatRouter.get('/delete/:friendId' , isAuth, deleteChat);

export default chatRouter;