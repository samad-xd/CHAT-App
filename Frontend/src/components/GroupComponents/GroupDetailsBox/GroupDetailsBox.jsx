import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import './GroupDetailsBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { deleteGroup, removeFromGroup, updateGroupImage, updateGroupName } from '../../../APIs/GroupsAPI';
import MembersActions from './MembersActions';
import { addGroup, changeSelectedGroup, removeGroup } from '../../../store/group';

export default function GroupDetailsBox({ setShowGroupDetails }) {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const dispatch = useDispatch();

    const nameRef = useRef('');

    async function handleNameChange() {
        const name = nameRef.current.value;
        if (name === group.name) return;
        const responseData = await updateGroupName(group._id, { name });
        dispatch(changeSelectedGroup(responseData.group));
        dispatch(removeGroup(group));
        dispatch(addGroup(responseData.group));
    }

    async function handleImageChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const responseData = await updateGroupImage(group._id, formData);
        dispatch(changeSelectedGroup(responseData.group));
        dispatch(removeGroup(group));
        dispatch(addGroup(responseData.group));
    }

    async function handleLeaveGroup() {
        await removeFromGroup(group._id, user._id);
        setShowGroupDetails(false);
        dispatch(changeSelectedGroup(null));
        dispatch(removeGroup(group));
    }

    async function handleDeleteGroup() {
        await deleteGroup(group._id);
        setShowGroupDetails(false);
        dispatch(changeSelectedGroup(null));
        dispatch(removeGroup(group));
    }

    return (
        <motion.div
            className="group-details-container"
            initial={{ x: +80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
        >
            {group &&
                <div className="group-details-box">
                    <div className='close-button' onClick={() => setShowGroupDetails(false)}><CloseIcon /></div>
                    <h1>Edit Group</h1>
                    <hr />
                    <div className='edit-group'>
                        <div className="group-edit-image">
                            {group.imageUrl &&
                                <>
                                    <img src={group.imageUrl} alt="profile-picture" />
                                    <label className='group-edit-button'>
                                        Change Picture
                                        <input type="file" onChange={handleImageChange} />
                                    </label>
                                </>
                            }
                            {!group.imageUrl &&
                                <>
                                    <img src="profile-picture.png" alt="profile-picture" />
                                    <label className='group-edit-button'>
                                        Add Picture
                                        <input type="file" onChange={handleImageChange} />
                                    </label>
                                </>
                            }
                        </div>
                        <div className='group-edit-name'>
                            <label htmlFor="name">Name :</label>
                            <input ref={nameRef} type="text" id='name' defaultValue={group.name} />
                            <div className='group-edit-button' onClick={handleNameChange}>Change Name</div>
                        </div>
                        <MembersActions />
                        <div className='group-leave-delete'>
                            <div className="group-red-button" onClick={handleLeaveGroup}>Leave Group</div>
                            <div className='group-red-button' onClick={handleDeleteGroup}>Delete Group</div>
                        </div>
                    </div>
                </div>
            }
        </motion.div>
    );
}