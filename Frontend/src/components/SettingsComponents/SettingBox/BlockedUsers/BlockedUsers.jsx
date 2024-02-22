import { useEffect, useState } from 'react';
import './BlockedUsers.css';
import { getBlockedUsers, unblockUser } from '../../../../APIs/usersAPI';
import Loading from '../../../LoadingComponents/Loading/Loading';
import { makeToast } from '../../../../utils/toast';

export default function BlockedUsers() {

    const [blockedUsers, setBlockedUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchBlockedUsers() {
            setIsLoading(true);
            const response = await getBlockedUsers();
            setBlockedUsers(response.data.blockedUsers);
            setIsLoading(false);
        }
        fetchBlockedUsers();
    }, []);

    async function handleUnblock(userId) {
        const response = await unblockUser(userId);
        if(!makeToast(response)) return;
        const users = blockedUsers.filter(user => user._id != userId);
        setBlockedUsers(users);
    }

    return (
        <div className="setting-box">
            <h1>Blocked Users</h1>
            <hr />
            {isLoading ?
                <Loading /> :
                <div className='blocked-users'>
                    {blockedUsers.map(user =>
                        <div key={user._id} className="blocked-user">
                            {user.imageUrl ? <img src={user.imageUrl} alt="Profile Picture" /> : <img src="profile-picture.png" alt="Profile Picture" /> }
                            <div className='blocked-user-name'>{user.name}</div>
                            <div className="unblock-button" onClick={() => handleUnblock(user._id)}>Unblock</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}