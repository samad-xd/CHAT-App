import express from 'express';

import { addMessage, getAllFriends, getChat, getMessages, messageAI } from '../Controllers/chatController.js';
import isAuth from '../Middlewares/auth.js';

const chatRouter = express.Router();

chatRouter.get('/all', isAuth, getAllFriends);

chatRouter.get('/:friendId' , isAuth, getChat);

chatRouter.get('/message/:chatId', isAuth, getMessages);

chatRouter.post('/message/send', isAuth, addMessage);

chatRouter.post('/message/send/AI', isAuth, messageAI);

export default chatRouter;