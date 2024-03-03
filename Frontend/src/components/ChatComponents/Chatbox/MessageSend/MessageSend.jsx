import { motion } from 'framer-motion';
import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import InputEmoji from 'react-input-emoji';

export default function MessageSend({ handleSend, handleImageSend }) {

    const [newMessage, setNewMessage] = useState('');

    function handleSendMessage(text) {
        handleSend(text);
        setNewMessage('');
    }

    function handleImage() {
        handleImageSend();
    }

    return (
        <div className='inputs'>
            <label className="add-file">
                <AddIcon />
                <input type='file' accept='image/*' onChange={handleImageSend} />
            </label>
            <div className='input-field'>
                <InputEmoji
                    value={newMessage}
                    onChange={(text) => setNewMessage(text)}
                    onEnter={() => handleSendMessage(newMessage)}
                    cleanOnEnter={true}
                />
            </div>
            <motion.div
                className='send-button'
                whileHover={{ scale: 1.1 }}
                onClick={() => handleSendMessage(newMessage)}
            >
                <SendIcon />
            </motion.div>
        </div>
    );
}