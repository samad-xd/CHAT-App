import express from 'express';

import isAuth from '../Middlewares/auth.js';
import { acceptFriendRequest, addFriendRequest, blockUser, cancelFriendRequest, deleteAcount, findFriends, getAllFriendRequests, getBlockedUsers, getUserProfile, rejectFriendRequest, removeFriend, unblockUser, updateName, updatePassword, updateProfilePicture } from '../Controllers/userController.js';
import { upload, cloudinaryUpload, cloudinaryDelete } from '../Middlewares/upload.js';
import { deleteUserNotifications } from '../Controllers/notificationController.js';
import { deleteAllChats } from '../Controllers/chatController.js';

const userRouter = express.Router();

userRouter.get('/find/:name', isAuth, findFriends);

userRouter.get('/add/:friendId', isAuth, addFriendRequest);

userRouter.get('/accept/:friendId', isAuth, acceptFriendRequest);

userRouter.get('/reject/:friendId', isAuth, rejectFriendRequest);

userRouter.get('/cancel/:friendId', isAuth, cancelFriendRequest);

userRouter.get('/remove/:friendId', isAuth, removeFriend);

userRouter.get('/requests/all', isAuth, getAllFriendRequests);

userRouter.get('/profile/:userId', isAuth, getUserProfile);

userRouter.get('/block/:userId', isAuth, blockUser);

userRouter.get('/unblock/:userId', isAuth, unblockUser);

userRouter.get('/blocked', isAuth, getBlockedUsers);

userRouter.post('/update/name', isAuth, updateName);

userRouter.post('/update/password', isAuth, updatePassword);

userRouter.post('/update/picture', isAuth, upload.single('image'), cloudinaryDelete, cloudinaryUpload, updateProfilePicture);

userRouter.get('/delete/account', isAuth, deleteUserNotifications, deleteAllChats, cloudinaryDelete, deleteAcount);

export default userRouter;