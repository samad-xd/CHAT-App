import { useState } from 'react';
import { Link } from 'react-router-dom';
import Submitting from '../../LoadingComponents/Submitting/Submitting';
import { removeFromGroup } from '../../../APIs/GroupsAPI';
import { useSelector } from 'react-redux';
import { makeToast } from '../../../utils/toast';

export default function RemoveGroupMember({ member, members, setFriends, setMembers }) {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handelUserRemove(userId) {
        setIsSubmitting(true);
        const response = await removeFromGroup(group._id, userId);
        if(!makeToast(response)) return;
        const friend = members.find(member => member._id === userId);
        setMembers(members => members.filter(member => member._id !== userId));
        setFriends(friends => [...friends, friend]);
        setIsSubmitting(false);
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
                <div className="member-remove-button" onClick={() => handelUserRemove(member._id)}>Remove</div>
            }
        </div>
    );
}