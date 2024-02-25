import { useState } from 'react';
import { Link } from 'react-router-dom';
import Submitting from '../../LoadingComponents/Submitting/Submitting';
import { removeFromGroup } from '../../../APIs/GroupsAPI';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function RemoveGroupMember({ member, members, setFriends, setMembers }) {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handelUserRemove(userId) {
        setIsSubmitting(true);
        const response = await removeFromGroup(group._id, userId);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            const friend = members.find(member => member._id === userId);
            setMembers(members => members.filter(member => member._id !== userId));
            setFriends(friends => [...friends, friend]);
        } else {
            toast.error(response.message, { duration: 2000 });
        }
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