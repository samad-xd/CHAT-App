import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import dotenv from 'dotenv';

import connectDatabase from './Configs/dbConnect.js';
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';
import chatRouter from './Routes/chatRoutes.js';
import groupRouter from './Routes/groupRoutes.js';
import notificationRouter from './Routes/notificationRoutes.js';

dotenv.config();

const app = express();

const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

app.use(express.json());

app.use(cors());

let activeUsers = [];

io.on('connection', (socket) => {

    socket.on('add-user', (userId) => {
        const userAlreadyActive = activeUsers.some((user) => user.userId === userId);
        if (!userAlreadyActive) {
            activeUsers.push({ id: userId, socketId: socket.id })
        }
        io.emit('get-users', activeUsers);
    });

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        io.emit('get-users', activeUsers);
    });

    socket.on('send-message', (messageData) => {
        const { receiverId } = messageData;
        const user = activeUsers.find((user) => user.id === receiverId);
        if (user) {
            io.to(user.socketId).emit('receive-message', messageData.message);
        }
    });

    socket.on('send-group-message', (messageData) => {
        messageData.members.forEach(memberId => {
            const user = activeUsers.find((user) => user.id === memberId);
            if (user) {
                io.to(user.socketId).emit('receive-group-message', messageData.message);
            }
        });
    });

});

app.use(authRouter);
app.use(userRouter);
app.use('/chat', chatRouter);
app.use('/group', groupRouter);
app.use('/notification', notificationRouter);

await connectDatabase();

server.listen(process.env.PORT || 3000, console.log('listening'));