import './ChatDetails.css';

import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser } from '../../../../../APIs/usersAPI';
import { changeUser } from '../../../../../store/auth';
import { changeChats, changeSelectedChat } from '../../../../../store/chat';

export default function ChatDetails({ showDetails, setShowDetails }) {

    const dispatch = useDispatch();

    const friend = useSelector(state => state.chatReducer.selectedChat);

    const friends = useSelector(state => state.chatReducer.chats);

    async function handleBlock() {
        const response = await blockUser(friend._id);
        console.log(response);
        dispatch(changeUser(response.user));
        const updatedFriends = friends.filter(user => user._id !== friend._id);
        dispatch(changeChats(updatedFriends));
        dispatch(changeSelectedChat(null));
    }

    return (
        <div>
            {showDetails &&
                <div className='chat-details'>
                    <div className='close-button' onClick={() => setShowDetails(false)}><CloseIcon /></div>
                    <div className='chat-detail-options'>
                        <Link to={`/profile/${friend._id}`} className='chat-option'>View Profile</Link>
                        <div className='chat-option' onClick={handleBlock} >Block User</div>
                    </div>
                </div>
            }
        </div>
    );
}

