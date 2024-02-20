import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { useEffect, useState } from 'react';
import { acceptFriendRequest, cancelFriendRequest, getUserProfile, rejectFriendRequest, removeFriend, sendFriendRequest } from '../../APIs/usersAPI';
import { changeUser } from '../../store/auth';
import { sendNotification } from '../../APIs/notificationAPI';

export default function Profile() {

    const { userId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => state.authReducer.user);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function getProfile() {
            const responseData = await getUserProfile(userId);
            setProfile(responseData.user);
        }
        getProfile();
    }, [userId]);

    const isRequestSent = user.sentRequests.some(id => id === userId);

    const isRequestPending = user.pendingRequests.some(id => id === userId);

    const isFriendAlready = user.friends.some(id => id === userId);

    const isSameUser = user._id === userId;

    let button = (<div className="add-friend-button" onClick={handleSendRequest}>Add Friend</div>);

    if (isFriendAlready) {
        button = (<div className="remove-friend-button" onClick={handleFriendRemove}>Remove Friend</div>);
    }

    if (isSameUser) {
        button = <></>
    }

    if (isRequestSent) {
        button = (<div className="remove-friend-button" onClick={handleCancelRequest}>Cancel Sent Request</div>);
    }

    if (isRequestPending) {
        button = (
            <div className='buttons'>
                <div className="add-friend-button" onClick={handleAcceptRequest}>Accept</div>
                <div className="remove-friend-button" onClick={handleRejectRequest}>Reject</div>
            </div>
        );
    }

    async function handleFriendRemove() {
        const response = await removeFriend(userId);
        dispatch(changeUser(response.user));
    }

    async function handleSendRequest() {
        const data = await sendFriendRequest(userId);
        dispatch(changeUser(data.user));
        const notification = {
            type: 'friends',
            from: user._id,
            to: profile._id,
            action: 'sent'
        }
        const response = await sendNotification(notification);
    }

    async function handleAcceptRequest() {
        const data = await acceptFriendRequest(userId);
        dispatch(changeUser(data.user));
        const notification = {
            type: 'friends',
            from: user._id,
            to: profile._id,
            action: 'accepted'
        }
        const response = await sendNotification(notification);
    }

    async function handleRejectRequest() {
        const data = await rejectFriendRequest(userId);
        dispatch(changeUser(data.user));
    }

    async function handleCancelRequest() {
        const data = await cancelFriendRequest(userId);
        dispatch(changeUser(data.user));
    }

    return (
        <div className='profile-page'>
            {profile &&
                <div className="profile-container">
                    <div className='back-buttons'>
                    <div className='back-button' onClick={() => navigate('/chat')}>Home</div>
                        <div className='back-button' onClick={() => navigate(-1)}>Go Back</div>
                    </div>
                    <div className='profile-header'>
                        <div className='image-border'>{profile.imageUrl ? <img src={profile.imageUrl} alt="Profile Picture" /> : <img src="profile-picture.png" alt="Profile Picture" />}</div>
                        <div className='profile-name'>{profile.name}</div>
                        {button}
                    </div>
                    <div className='friends-cards-container'>
                        <div className='friends-title'>Friends</div>
                        <div className="friends-cards">
                            {profile.friends.map(friend =>
                                <Link to={`/profile/${friend._id}`} key={friend._id} className='friend-card'>
                                    {friend.imageUrl ? <img src={friend.imageUrl} alt="Profile Picture" /> : <img src="profile-picture.png" alt="Profile Picture" />}
                                    <div className='friend-profile-name'>{friend.name}</div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}