import { useDispatch, useSelector } from 'react-redux';

import { acceptFriendRequest, cancelFriendRequest, rejectFriendRequest, sendFriendRequest } from '../../../../APIs/usersAPI';
import { changeUser } from '../../../../store/auth';

import './FoundFriend.css';
import { sendNotification } from '../../../../APIs/notificationAPI';

export default function FoundFriend({ friend }) {

    const user = useSelector((state) => state.authReducer.user);

    const isRequestSent = user.sentRequests.some(id => id === friend._id);

    const isRequestPending = user.pendingRequests.some(id => id === friend._id);

    const isFriendAlready = user.friends.some(id => id === friend._id);

    let buttonContent;

    if (isRequestPending) {
        buttonContent = <div className='request-buttons'>
            <div className='request-button' onClick={handleAcceptRequest}>Accept</div>
            <div className='request-button' onClick={handleRejectRequest}>Reject</div>
        </div>;
    } else if (isRequestSent) {
        buttonContent = <div className='request-button' onClick={handleCancelRequest}>Cancel</div>;
    } else if (isFriendAlready) {
        buttonContent = <div className='request-button'>Added</div>;
    } else {
        buttonContent = <div className='request-button' onClick={handleSendRequest}>Add</div>;
    }

    const dispatch = useDispatch();

    async function handleSendRequest() {
        const data = await sendFriendRequest(friend._id);
        dispatch(changeUser(data.user));
        const notification = {
            type: 'friends',
            from: user._id,
            to: friend._id,
            action: 'sent'
        }
        const response = await sendNotification(notification);
    }

    async function handleAcceptRequest() {
        const data = await acceptFriendRequest(friend._id);
        dispatch(changeUser(data.user));
        const notification = {
            type: 'friends',
            from: user._id,
            to: friend._id,
            action: 'accepted'
        }
        const response = await sendNotification(notification);
    }

    async function handleRejectRequest() {
        const data = await rejectFriendRequest(friend._id);
        dispatch(changeUser(data.user));
    }

    async function handleCancelRequest() {
        const data = await cancelFriendRequest(friend._id);
        dispatch(changeUser(data.user));
    }

    return (
        <div className="found-friend">
            <div className="found-friend-details">
                {friend.imageUrl ? <img src={friend.imageUrl} alt="profile-picture" /> : <img src="profile-picture.png" alt="profile-picture" />}
                <div className="found-friend-name">{friend.name}</div>
            </div>
            {buttonContent}
        </div>
    );
}