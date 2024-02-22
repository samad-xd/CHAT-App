import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import './Chats.css';

import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

import { getAllFriendsData } from '../../../APIs/chatAPI';
import Conversation from './Conversation/Conversation';
import { changeChats } from '../../../store/chat';
import Loading from '../../LoadingComponents/Loading/Loading';

export default function Chats() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.authReducer.user);

    const AI = useSelector(state => state.authReducer.AI);

    const selectedUser = useSelector(state => state.chatReducer.selectedChat);

    const activeUsers = useSelector(state => state.chatReducer.activeUsers);

    const friends = useSelector(state => state.chatReducer.chats);

    const [isLoading, setIsLoading] = useState(false);

    const [filteredFriends, setFilteredFriends] = useState([]);

    const searchRef = useRef('');

    useEffect(() => {
        async function fetchFriends() {
            setIsLoading(true);
            const response = await getAllFriendsData();
            dispatch(changeChats(response.data.friends));
            setIsLoading(false);
        }
        fetchFriends();
    }, [user]);

    function handleSearch() {
        const name = searchRef.current.value;
        const friendsArray = friends.filter(friend => friend.name === name);
        setFilteredFriends(friendsArray);
    }

    function handleReset() {
        searchRef.current.value = '';
        dispatch(changeChats([...friends]));
    }

    return (
        <motion.div
            className="chats-container"
            initial={{ x: +40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
        >
            <div className="chats">
                <h1>Chats</h1>
                <hr />
                <div className='search-field'>
                    <input type='text' placeholder='Search' ref={searchRef} />
                    <SearchIcon className='search-icon-2' onClick={handleSearch} />
                    <ReplayIcon className='search-icon-2' onClick={handleReset} />
                </div>
                {isLoading && <Loading />}
                {!isLoading && (
                    <div className="chats-list">
                        {searchRef.current.value === '' &&
                            <>
                                <Conversation
                                    user={AI}
                                    isSelected={selectedUser && selectedUser._id === AI._id}
                                    isAI={true}
                                    isOnline={true}
                                />
                                {friends.map(friend =>
                                    <Conversation
                                        key={friend._id}
                                        user={friend}
                                        isSelected={selectedUser && selectedUser._id === friend._id}
                                        isOnline={activeUsers.some(user => user.id === friend._id)}
                                    />
                                )}
                            </>}
                        {searchRef.current.value !== '' &&
                            filteredFriends.map(friend =>
                                <Conversation
                                    key={friend._id}
                                    user={friend}
                                    isSelected={selectedUser && selectedUser._id === friend._id}
                                    isOnline={activeUsers.some(user => user.id === friend._id)}
                                />
                            )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}