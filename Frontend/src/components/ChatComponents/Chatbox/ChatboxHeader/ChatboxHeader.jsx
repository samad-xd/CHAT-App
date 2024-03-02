import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatDetails from './ChatDetails/ChatDetails';

export default function ChatboxHeader({ chat }) {

    const friend = useSelector(state => state.chatReducer.selectedChat);

    const activeUsers = useSelector(state => state.chatReducer.activeUsers);

    const AI = useSelector(state => state.authReducer.AI);

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="chatbox-header">
            {friend.imageUrl ? <img src={friend.imageUrl} alt="profile-picture" /> : <img src="profile-picture.png" alt="profile-picture" />}
            <div className='chat-profile'>
                <div>
                    <div className='chat-name'>{friend.name}</div>
                    <div className='online-status'>{AI._id === friend._id || activeUsers.some(user => user.id === friend._id) ? 'Online' : 'Offline'}</div>
                </div>
                <div className='profile-details' onClick={() => setShowDetails(true)}>
                    {AI._id !== friend._id && <InfoIcon />}
                </div>
            </div>
            <ChatDetails showDetails={showDetails} setShowDetails={setShowDetails} />
        </div>
    );
}