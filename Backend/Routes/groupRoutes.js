import express from 'express';

import isAuth from '../Middlewares/auth.js';
import { addGroupMessage, addToGroup, createGroup, deleteGroup, getAllGroups, getGroupMembers, getGroupMessages, getMembersNotInGroup, removeFromGroup, updateGroupImage, updateGroupName } from '../Controllers/groupController.js'
import { cloudinaryGroupImageDelete, cloudinaryUpload, upload } from '../Middlewares/upload.js';
import { deleteGroupNotifications } from '../Controllers/notificationController.js';

const groupRouter = express.Router();

groupRouter.post('/create', isAuth, upload.single('image'), cloudinaryUpload, createGroup);

groupRouter.get('/all', isAuth, getAllGroups);

groupRouter.get('/message/:groupId', isAuth, getGroupMessages);

groupRouter.post('/message/send', isAuth, addGroupMessage);

groupRouter.get('/add/:groupId/:userId', isAuth, addToGroup);

groupRouter.get('/remove/:groupId/:userId', isAuth, removeFromGroup);

groupRouter.get('/delete/:groupId', isAuth, deleteGroupNotifications, deleteGroup);

groupRouter.get('/members/:groupId', isAuth, getGroupMembers);

groupRouter.get('/friends/:groupId', isAuth, getMembersNotInGroup);

groupRouter.post('/update/name/:groupId', isAuth, updateGroupName);

groupRouter.post('/update/image/:groupId', isAuth, upload.single('image'), cloudinaryGroupImageDelete, cloudinaryUpload, updateGroupImage);

export default groupRouter;