import { useDispatch, useSelector } from 'react-redux';
import './Conversation.css';

import { motion } from 'framer-motion';
import { changeSelectedChat } from '../../../../store/chat';

export default function Conversation({ user, isSelected, isOnline }) {

    const dispatch = useDispatch();

    let classes = "conversation";
    let style = { scale: 1.05 };

    if (isSelected) {
        classes += " selected";
        style = {};
    }

    function handleSelect() {
        dispatch(changeSelectedChat(user))
    }

    return (
        <motion.div
            className={classes}
            whileHover={style}
            onClick={handleSelect}
        >
            {user.imageUrl ? <img src={user.imageUrl} alt="profile-picture" /> : <img src="profile-picture.png" alt="profile-picture" />}
            <div className='conversation-details'>
                <div>{user.name}</div>
                <div>{isOnline ? 'Online' : 'Offline'}</div>
            </div>
        </motion.div>
    );
}