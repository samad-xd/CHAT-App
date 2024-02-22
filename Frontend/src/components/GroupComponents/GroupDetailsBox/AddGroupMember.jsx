import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToGroup } from '../../../APIs/GroupsAPI';
import { sendNotification } from '../../../APIs/notificationAPI';
import Submitting from '../../LoadingComponents/Submitting/Submitting';
import { useSelector } from 'react-redux';
import { makeToast } from '../../../utils/toast';

export default function AddGroupMember({ member, friends, setFriends, setMembers }) {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const user = useSelector(state => state.authReducer.user);

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handelUserAdd(userId) {
        setIsSubmitting(true);
        const response = await addToGroup(group._id, userId);
        if(!makeToast(response)) return;
        const friend = friends.find(friend => friend._id === userId);
        setMembers(members => [...members, friend]);
        setFriends(friends => friends.filter(friend => friend._id !== userId));
        setIsSubmitting(false);
        const notification = {
            type: 'groups',
            from: user._id,
            to: userId,
            group: group._id
        }
        await sendNotification(notification);
    }

    return (
        <div key={member._id} className="friend-detail">
            <Link to={`/profile/${member._id}`} className='friend-name-image'>
                {member.imageUrl ?
                    <img src={member.imageUrl} alt="profile-picture" /> :
                    <img src="profile-picture.png" alt="profile-picture" />
                }
                <div>{member.name}</div>
            </Link>
            {isSubmitting ?
                <Submitting /> :
                <div className="member-add-button" onClick={() => handelUserAdd(member._id)}>Add</div>
            }
        </div>
    );
}