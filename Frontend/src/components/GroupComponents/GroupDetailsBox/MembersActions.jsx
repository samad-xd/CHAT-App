import './GroupDetailsBox.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToGroup, fetchGroupMembers, fetchMembersNotInGroup, removeFromGroup } from '../../../APIs/GroupsAPI';
import { sendNotification } from '../../../APIs/notificationAPI';

export default function MembersActions() {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [selectedOption, setSelectedOption] = useState('view');

    const [members, setMembers] = useState([]);

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchMembers() {
            const responseData = await fetchGroupMembers(group._id);
            setMembers(responseData.members);
        }
        fetchMembers();
    }, []);

    useEffect(() => {
        async function fetchFriends() {
            const responseData = await fetchMembersNotInGroup(group._id);
            setFriends(responseData.friends);
        }
        fetchFriends();
    }, []);

    async function handelUserAdd(userId) {
        await addToGroup(group._id, userId);
        const friend = friends.find(friend => friend._id === userId);
        setMembers(members => [...members, friend]);
        setFriends(friends => friends.filter(friend => friend._id !== userId));
        const notification = {
            type: 'groups',
            from: user._id,
            to: userId,
            group: group._id
        }
        await sendNotification(notification);
    }

    async function handelUserRemove(userId) {
        await removeFromGroup(group._id, userId);
        const friend = members.find(member => member._id === userId);
        setMembers(members => members.filter(member => member._id !== userId));
        setFriends(friends => [...friends, friend]);
    }

    return (
        <div className='members-details'>
            <div className='members-options'>
                <div
                    className={selectedOption === 'view' ? "member-option-active" : "member-option"}
                    onClick={() => setSelectedOption('view')}
                >
                    View Members
                </div>
                <div
                    className={selectedOption === 'add' ? "member-option-active" : "member-option"}
                    onClick={() => setSelectedOption('add')}
                >
                    Add Members
                </div>
                <div
                    className={selectedOption === 'remove' ? "member-option-active" : "member-option"}
                    onClick={() => setSelectedOption('remove')}
                >
                    Remove Members
                </div>
            </div>
            <div className="members-list">
                {selectedOption === 'view' && members.map(member =>
                    <div key={member._id} className="friend-detail">
                        <Link to={`/profile/${member._id}`} className='friend-name-image'>
                            <img src={member.imageUrl} alt="profile-picture" />
                            <div>{member.name}</div>
                        </Link>
                    </div>
                )}
                {selectedOption === 'add' && friends.map(member =>
                    <div key={member._id} className="friend-detail">
                        <Link to={`/profile/${member._id}`} className='friend-name-image'>
                            <img src={member.imageUrl} alt="profile-picture" />
                            <div>{member.name}</div>
                        </Link>
                        <div className="member-add-button" onClick={() => handelUserAdd(member._id)}>Add</div>
                    </div>
                )}
                {selectedOption === 'remove' && members.map(member => {
                    if (member._id !== user._id) {
                        return (
                            <div key={member._id} className="friend-detail">
                                <Link to={`/profile/${member._id}`} className='friend-name-image'>
                                    <img src={member.imageUrl} alt="profile-picture" />
                                    <div>{member.name}</div>
                                </Link>
                                <div className="member-remove-button" onClick={() => handelUserRemove(member._id)}>Remove</div>
                            </div>
                        );
                    }
                }
                )}
            </div>
        </div>
    );
}