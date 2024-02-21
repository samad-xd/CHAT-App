import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import FoundFriend from './FoundFriend/FoundFriend';
import './AddFriends.css';

import SearchIcon from '@mui/icons-material/Search';
import { findFriends } from '../../../APIs/usersAPI';

export default function AddFriends() {

    const searchRef = useRef('');

    const [foundFriends, setFoundFriends] = useState([]);

    async function handleSearch() {
        const name = searchRef.current.value;
        const data = await findFriends(name);
        setFoundFriends(data.result);
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
                    <div className="search-icon" onClick={handleSearch}>
                        <SearchIcon />
                    </div>
                </div>
                <div className="found-friends">                                 
                    {foundFriends.map((friend) => (
                        <FoundFriend key={friend._id} friend={friend} status='found' />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}