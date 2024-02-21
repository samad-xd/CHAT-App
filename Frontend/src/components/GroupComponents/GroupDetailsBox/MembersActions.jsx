import './GroupDetailsBox.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchGroupMembers, fetchMembersNotInGroup } from '../../../APIs/GroupsAPI';
import Loading from '../../LoadingComponents/Loading/Loading';
import ViewGroupMember from './ViewGroupMember';
import AddGroupMember from './AddGroupMember';
import RemoveGroupMember from './RemoveGroupMember';

export default function MembersActions() {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [selectedOption, setSelectedOption] = useState('view');

    const [members, setMembers] = useState([]);

    const [friends, setFriends] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchMembers() {
            setIsLoading(true);
            const responseData = await fetchGroupMembers(group._id);
            setMembers(responseData.members);
        }
        async function fetchFriends() {
            const responseData = await fetchMembersNotInGroup(group._id);
            setFriends(responseData.friends);
            setIsLoading(false);
        }
        fetchMembers();
        fetchFriends();
    }, []);

    return (
        <div className='members-details'>
            {isLoading ? <Loading /> :
                <>
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
                            <ViewGroupMember key={member._id} member={member} />
                        )}
                        {selectedOption === 'add' && friends.map(member =>
                            <AddGroupMember
                                key={member._id}
                                member={member}
                                friends={friends}
                                setFriends={setFriends}
                                setMembers={setMembers}
                            />
                        )}
                        {selectedOption === 'remove' && members.map(member => {
                            if (member._id !== user._id) {
                                return (
                                    <RemoveGroupMember
                                        key={member._id}
                                        member={member}
                                        members={members}
                                        setFriends={setFriends}
                                        setMembers={setMembers}
                                    />
                                );
                            }
                        }
                        )}
                    </div>
                </>
            }
        </div>
    );
}