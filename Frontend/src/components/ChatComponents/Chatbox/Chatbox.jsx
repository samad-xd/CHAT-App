import './Chatbox.css';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchChatData, fetchMessages, getAImesssage, sendImage, sendMessage } from '../../../APIs/chatAPI';
import { socket } from '../../../pages/Chat/Chat';
import MessageSend from './MessageSend/MessageSend';
import ChatboxHeader from './ChatboxHeader/ChatboxHeader';
import Messages from './Messages/Messages';


export default function Chatbox() {

    const user = useSelector(state => state.authReducer.user);

    const friend = useSelector(state => state.chatReducer.selectedChat);

    const AI = useSelector(state => state.authReducer.AI);

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [receivedMessage, setReceivedMessage] = useState(null);

    useEffect(() => {
        async function getChat() {
            const response = await fetchChatData(friend._id);
            setChat(response.data.chat);
        }
        if (friend) {
            setIsLoading(true);
            getChat();
        }
    }, [friend]);

    useEffect(() => {
        async function getMessages() {
            const response = await fetchMessages(chat._id);
            setMessages(response.data.messages);
            setIsLoading(false);
        }
        if (chat) getMessages();
    }, [chat]);

    async function handleSend(text) {
        if (text === '') return;
        const message = {
            senderId: user._id,
            chatId: chat._id,
            text
        }
        if (AI._id === friend._id) {
            const oldMessages = [...messages];
            setMessages([...messages, message]);
            const response = await getAImesssage(message);
            setMessages([...oldMessages, message, response.data.message]);
        }
        else {
            setMessages([...messages, message]);
            socket.emit('send-message', ({ message, receiverId: friend._id }));
            await sendMessage(message);
        }
    }

    async function handleImageSend(event) {
        if (AI._id === friend._id) return;
        const message = {
            senderId: user._id,
            chatId: chat._id,
            image: event.target.files[0]
        }
        const response = await sendImage(message);
        console.log(response);
        setMessages([...messages, response.data.addedMessage]);
        socket.emit('send-message', ({ message: response.data.addedMessage, receiverId: friend._id }));
    }

    useEffect(() => {
        socket.on('receive-message', (message) => {
            setReceivedMessage(message);
        });
    }, []);

    useEffect(() => {
        if (receivedMessage !== null) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage]);

    return (
        <motion.div
            className="chatbox-container"
            initial={{ x: +80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
        >
            {friend === null && <p>Select a user to start chatting</p>}
            {friend &&
                <div className="chatbox">
                    <ChatboxHeader />
                    <Messages isLoading={isLoading} messages={messages} />
                    <MessageSend handleSend={handleSend} handleImageSend={handleImageSend} />
                </div>
            }
        </motion.div>
    );
}