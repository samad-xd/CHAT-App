import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import './FriendRequests.css';
import { getAllFriendRequests } from '../../../APIs/usersAPI';
import FoundFriend from '../AddFriends/FoundFriend/FoundFriend';
import Loading from '../../LoadingComponents/Loading/Loading';

export default function FriendRequests() {

    const user = useSelector(state => state.authReducer.user);

    const [selectedRequest, setSelectedRequest] = useState('pending');
    const [requests, setRequests] = useState({ sentRequests: [], pendingRequests: [] });

    const [isLoading, setIsLoading] = useState(false);

    function handleSelectedRequest(requestType) {
        setSelectedRequest(requestType);
    }

    useEffect(() => {
        async function getFriendRequests() {
            setIsLoading(true);
            const response = await getAllFriendRequests();
            setRequests(response.data);
            setIsLoading(false);
        }
        getFriendRequests();
    }, []);

    return (
        <motion.div
            className="friend-requests-container"
            initial={{ x: +80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
        >
            <div className="friend-requests">
                <h1>Friend Requests</h1>
                <hr />
                <div className='request-types'>
                    <div
                        className='request-type'
                        onClick={() => handleSelectedRequest('pending')}
                    >
                        Pending
                    </div>
                    <div
                        className='request-type'
                        onClick={() => handleSelectedRequest('sent')}
                    >
                        Sent
                    </div>
                </div>
                <div className='underlines'>
                    <hr className={selectedRequest === 'pending' ? '' : 'notSelected'} />
                    <hr className={selectedRequest === 'sent' ? '' : 'notSelected'} />
                </div>
                {isLoading ?
                    <Loading /> :
                    <div className="requests">
                        {selectedRequest === 'pending' && requests.pendingRequests.map(request =>
                            <FoundFriend key={request._id} friend={request} />
                        )}
                        {selectedRequest === 'sent' && requests.sentRequests.map(request =>
                            <FoundFriend key={request._id} friend={request} />
                        )}
                    </div>
                }
            </div>
        </motion.div>
    );
}