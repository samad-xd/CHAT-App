import express from 'express';

import isAuth from '../Middlewares/auth.js';
import { addNotification, getAllNotifications, readNotification } from '../Controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post('/send', isAuth, addNotification);

notificationRouter.get('/read/:notificationId', isAuth, readNotification);

notificationRouter.get('/all', isAuth, getAllNotifications);

export default notificationRouter;