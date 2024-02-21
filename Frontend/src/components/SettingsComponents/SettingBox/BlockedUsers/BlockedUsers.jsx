import { useEffect, useState } from 'react';
import './BlockedUsers.css';
import { getBlockedUsers, unblockUser } from '../../../../APIs/usersAPI';
import Loading from '../../../LoadingComponents/Loading/Loading';

export default function BlockedUsers() {

    const [blockedUsers, setBlockedUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchBlockedUsers() {
            setIsLoading(true);
            const responseData = await getBlockedUsers();
            setBlockedUsers(responseData.blockedUsers);
            setIsLoading(false);
        }
        fetchBlockedUsers();
    }, []);

    async function handleUnblock(userId) {
        await unblockUser(userId);
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
                            <div className='blocked-user-name'>{user.name}</div>
                            <div className="unblock-button" onClick={() => handleUnblock(user._id)}>Unblock</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}