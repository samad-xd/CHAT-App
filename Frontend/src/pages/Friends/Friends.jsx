import AddFriends from '../../components/FreindsComponents/AddFriends/AddFriends';
import FriendRequests from '../../components/FreindsComponents/FriendRequests/FriendRequests';

import './Friends.css';

export default function Friends() {

    return (
        <div className='friends'>
            <AddFriends />
            <FriendRequests />
        </div>
    );
}