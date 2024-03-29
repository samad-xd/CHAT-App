import { motion } from 'framer-motion';
import './GroupChatbox.css';
import GroupChatboxHeader from './GroupChatboxHeader/GroupChatboxHeader';
import { useEffect, useState } from 'react';
import { fetchGroupMessages, sendGroupImageMessage, sendGroupMessage } from '../../../APIs/GroupsAPI';
import GroupMessages from './GroupMessages/GroupMessages';
import MessageSend from '../../ChatComponents/Chatbox/MessageSend/MessageSend';
import { useSelector } from 'react-redux';
import { socket } from '../../../pages/Chat/Chat';

export default function GroupChatbox({ setShowGroupDetails }) {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [messages, setMessages] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchMessages() {
            setIsLoading(true);
            const response = await fetchGroupMessages(group._id);
            setMessages(response.data.groupMessages);
            setIsLoading(false)
        }
        if (group) fetchMessages();
    }, [group]);

    async function handleSend(text) {
        if (text === '') return;
        const message = {
            senderId: user._id,
            senderName: user.name,
            groupId: group._id,
            text
        }
        setMessages([...messages, message]);
        const members = group.members.filter(memberId => memberId !== user._id);
        socket.emit('send-group-message', { members, message });
        await sendGroupMessage(message);
    }

    async function handleImageSend(event) {
        const message = {
            senderId: user._id,
            senderName: user.name,
            groupId: group._id,
            image: event.target.files[0]
        }
        const response = await sendGroupImageMessage(message);
        setMessages([...messages, response.data.addedMessage]);
        const members = group.members.filter(memberId => memberId !== user._id);
        socket.emit('send-group-message', { members, message: response.data.addedMessage });
    }

    useEffect(() => {
        socket.on('receive-group-message', (message) => {
            setReceivedMessage(message);
        })
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
            {group === null && <p>Select a Group to start chatting</p>}
            {group &&
                <div className="chatbox">
                    <GroupChatboxHeader setShowGroupDetails={setShowGroupDetails} />
                    <GroupMessages messages={messages} isLoading={isLoading} />
                    <MessageSend handleSend={handleSend} handleImageSend={handleImageSend} />
                </div>
            }
        </motion.div>
    );
}