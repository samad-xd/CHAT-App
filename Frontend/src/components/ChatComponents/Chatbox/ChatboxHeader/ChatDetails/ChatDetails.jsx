import './ChatDetails.css';

import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser } from '../../../../../APIs/usersAPI';
import { changeUser } from '../../../../../store/auth';
import { changeChats, changeSelectedChat } from '../../../../../store/chat';
import { toast } from 'sonner';
import { deleteChat } from '../../../../../APIs/chatAPI';

export default function ChatDetails({ showDetails, setShowDetails }) {

    const dispatch = useDispatch();

    const friend = useSelector(state => state.chatReducer.selectedChat);

    const friends = useSelector(state => state.chatReducer.chats);

    function confirmBlock() {
        toast('Are you sure?', {
            action: {
                label: 'Block',
                onClick: () => handleBlock()
            },
            cancel: {
                label: 'Cancel',
            },
            position: 'top-right',
            duration: 2000
        })
    }

    async function handleBlock() {
        toast.promise(new Promise(async (resolve, reject) => {
            const response = await blockUser(friend._id);
            if (response.status === 200) {
                dispatch(changeUser(response.data.user));
                const updatedFriends = friends.filter(user => user._id !== friend._id);
                dispatch(changeChats(updatedFriends));
                dispatch(changeSelectedChat(null));
                resolve();
            } else {
                reject();
            }
        }), {
            loading: 'Blocking...',
            success: 'Blocked successfully.',
            error: 'Failed to block this user.',
            duration: 2000
        });
    }

    function confirmChatDelete() {
        toast('Are you sure?', {
            action: {
                label: 'Delete Chat',
                onClick: () => handleChatDelete()
            },
            cancel: {
                label: 'Cancel',
            },
            position: 'top-right',
            duration: 2000
        })
    }

    async function handleChatDelete() {
        toast.promise(new Promise(async (resolve, reject) => {
            const response = await deleteChat(friend._id);
            if (response.status === 200) {
                const friendData = { ...friend };
                dispatch(changeSelectedChat(friendData));
                setShowDetails(false);
                resolve();
            } else {
                reject();
            }
        }), {
            loading: 'Deleteing Chat...',
            success: 'Chat deleted successfully.',
            error: 'Failed to delete this chat.',
            duration: 2000
        });
    }

    return (
        <div>
            {showDetails &&
                <div className='chat-details'>
                    <div className='close-button' onClick={() => setShowDetails(false)}><CloseIcon /></div>
                    <div className='chat-detail-options'>
                        <Link to={`/profile/${friend._id}`} className='chat-option'>View Profile</Link>
                        <div className='chat-option' onClick={confirmBlock} >Block User</div>
                        <div className='chat-option' onClick={confirmChatDelete} >Delete Chat</div>
                    </div>
                </div>
            }
        </div>
    );
}

