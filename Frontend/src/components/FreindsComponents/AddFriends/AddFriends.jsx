import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import FoundFriend from './FoundFriend/FoundFriend';
import './AddFriends.css';

import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import { findFriends } from '../../../APIs/usersAPI';
import { useSelector } from 'react-redux';

export default function AddFriends() {

    const searchRef = useRef('');

    const user = useSelector(state => state.authReducer.user);

    const [foundFriends, setFoundFriends] = useState([]);

    function handleSearch() {
        const name = searchRef.current.value;
        if (name === '') return;
        toast.promise(new Promise(async (resolve, reject) => {
            const response = await findFriends(name);
            setFoundFriends(response.data.result);
            response.data.result.length !== 0 ? resolve() : reject()
        }), {
            loading: 'Fetching...',
            success: 'Fetched successfully',
            error: 'No one found with given name',
            duration: 2000
        });
    }

    function handleReset() {
        searchRef.current.value = '';
        setFoundFriends([]);
    }

    return (
        <motion.div
            className="add-friends-container"
            initial={{ x: +40 }}
            animate={{ x: 0 }}
            exit={{ x: -40 }}
        >
            <div className="add-friends">
                <h1>Find Friends</h1>
                <hr />
                <div className='search-friend'>
                    <input ref={searchRef} type="text" placeholder='Search New Friend' />
                    <SearchIcon className="search-icon" onClick={handleSearch} />
                    <ReplayIcon className='search-icon-2' onClick={handleReset} />
                </div>
                <div className="found-friends">
                    {foundFriends.map((friend) => {
                        if (friend._id !== user._id) {
                            return (<FoundFriend key={friend._id} friend={friend} status='found' />);
                        }
                    })}
                </div>
            </div>
        </motion.div>
    );
}