import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewGroupForm.css';
import { createGroup } from '../../../../APIs/GroupsAPI';
import Dialog from '../../../Dialog/Dialog';
import { addGroup } from '../../../../store/group';
import { sendNotification } from '../../../../APIs/notificationAPI';
import { makeToast } from '../../../../utils/toast';

export default function NewGroupForm({ showDialog, setShowDialog }) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.authReducer.user);

    const friends = useSelector(state => state.chatReducer.chats);

    const [selectedFriends, setSelectedFriends] = useState([user._id]);

    function handleFriendSelection(event) {
        if (event.target.checked) {
            setSelectedFriends((prevFriends) => [...prevFriends, event.target.value]);
        }
        else {
            setSelectedFriends((prevFriends) => prevFriends.filter(id => id !== event.target.value));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let groupData = Object.fromEntries(formData);
        groupData = { ...groupData, friends: selectedFriends };
        const response = await createGroup(groupData);
        if(!makeToast(response)) return;
        dispatch(addGroup(response.data.group));
        event.target.reset();
        setShowDialog(false);
        groupData.friends.forEach(async (friendId) => {
            if(user._id !== friendId) {
                const notification = {
                    type: 'groups',
                    from: user._id,
                    to: friendId,
                    group: response.data.group._id
                }
                await sendNotification(notification);
            }
        });
    }

    return (
        <Dialog showDialog={showDialog} setShowDialog={setShowDialog} >
            <form className="new-group-form" onSubmit={handleSubmit}>
                <input type="text" name="groupName" placeholder='Group Name' required={true} />
                <input type='file' name='image' placeholder='Group Image' />
                <div className='title-text'><span>Add friends to Group</span></div>
                <div className="friends-checkboxes">
                    {friends.map(friend => <div key={friend._id} className='friend-checkbox'>
                        <input id={friend._id} type='checkbox' value={friend._id} onChange={handleFriendSelection} />
                        <label htmlFor={friend._id}>{friend.name}</label>
                    </div>)}
                </div>
                <button type='submit'>Create</button>
            </form>
        </Dialog>
    );
}