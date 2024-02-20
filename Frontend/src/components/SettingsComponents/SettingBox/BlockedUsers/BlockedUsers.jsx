import { useEffect, useState } from 'react';
import './BlockedUsers.css';
import { getBlockedUsers, unblockUser } from '../../../../APIs/usersAPI';

export default function BlockedUsers() {

    const [blockedUsers, setBlockedUsers] = useState([]);

    useEffect(() => {
        async function fetchBlockedUsers() {
            const responseData = await getBlockedUsers();
            setBlockedUsers(responseData.blockedUsers);
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
            <div className='blocked-users'>
                {blockedUsers.map(user =>
                    <div key={user._id} className="blocked-user">
                        <div className='blocked-user-name'>{user.name}</div>
                        <div className="unblock-button" onClick={() => handleUnblock(user._id)}>Unblock</div>
                    </div>
                )}  
            </div>
        </div>
    );
}