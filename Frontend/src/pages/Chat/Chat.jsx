import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import Chats from "../../components/ChatComponents/Chats/Chats";
import Chatbox from "../../components/ChatComponents/Chatbox/Chatbox";

import './Chat.css';
import { changeActiveUsers } from "../../store/chat";

export const socket = io('http://localhost:3000');

export default function Chat() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        socket.emit('add-user', (user._id));
        socket.on('get-users', (users) => {
            dispatch(changeActiveUsers(users));
        });
    }, [user]);

    return (
        <div className="chat">
            <Chats />
            <Chatbox />
        </div>
    );
}