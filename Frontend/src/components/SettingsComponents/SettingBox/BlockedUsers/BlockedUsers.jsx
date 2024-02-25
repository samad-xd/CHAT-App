import { useEffect, useState } from 'react';
import './BlockedUsers.css';
import { getBlockedUsers } from '../../../../APIs/usersAPI';
import Loading from '../../../LoadingComponents/Loading/Loading';
import BlockedUser from './BlockedUser';

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

    return (
        <div className="setting-box">
            <h1>Blocked Users</h1>
            <hr />
            {isLoading ?
                <Loading /> :
                <div className='blocked-users'>
                    {blockedUsers.map(user =>
                        <BlockedUser key={user._id} user={user} blockedUsers={blockedUsers} setBlockedUsers={setBlockedUsers}  />
                    )}
                </div>
            }
        </div>
    );
}