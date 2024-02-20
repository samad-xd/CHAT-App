import { useRef, useState } from 'react';
import './EditProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, updateName, updatePassword, updateProfilePicture } from '../../../../APIs/usersAPI';
import { changeUser, updateLogoutState } from '../../../../store/auth';
import { resetChatState } from '../../../../store/chat';
import { resetGroupState } from '../../../../store/group';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => state.authReducer.user);

    const nameRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const [showChangePassword, setShowChangePasssword] = useState(false);

    async function handleImageChange(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const responseData = await updateProfilePicture(formData);
        dispatch(changeUser(responseData.user));
    }

    async function handleNameChange() {
        const name = nameRef.current.value;
        if (name === user.name) return;
        const responseData = await updateName({ name });
        dispatch(changeUser(responseData.user));
    }

    async function handlePasswordChange() {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const responseData = await updatePassword({ password, confirmPassword });
        dispatch(changeUser(responseData.user));
        console.log(responseData);
        setShowChangePasssword(false);
    }

    async function handleDeleteAccount() {
        const responseData = await deleteAccount();
        console.log(responseData);
        dispatch(updateLogoutState());
        dispatch(resetChatState());
        dispatch(resetGroupState());
        navigate('/login');
    }

    return (
        <div className="setting-box">
            <h1>Edit Profile</h1>
            <hr />
            <div className='edit-profile'>
                <div className="edit-image">
                    {user.imageUrl &&
                        <>
                            <img src={user.imageUrl} alt="profile-picture" />
                            <label className='edit-button'>
                                Change Picture
                                <input type="file" onChange={handleImageChange} />
                            </label>
                        </>
                    }
                    {!user.imageUrl &&
                        <>
                            <img src="profile-picture.png" alt="profile-picture" />
                            <div className='edit-button'>Add Picture</div>
                        </>
                    }
                </div>
                <div className='edit-name'>
                    <label htmlFor="name">Name :</label>
                    <input ref={nameRef} type="text" id='name' defaultValue={user.name} />
                    <div className='edit-button' onClick={handleNameChange}>Change Name</div>
                </div>
                {!showChangePassword && <div className='edit-button' onClick={() => setShowChangePasssword(true)}>Change Password</div>}
                {showChangePassword &&
                    <div className='edit-password'>
                        <input ref={passwordRef} type="password" placeholder='Password' />
                        <input ref={confirmPasswordRef} type="password" placeholder='Confirm Password' />
                        <div className='edit-password-buttons'>
                            <div className='edit-button' onClick={handlePasswordChange}>Update Password</div>
                            <div className='edit-button delete' onClick={() => setShowChangePasssword(false)}>Cancel</div>
                        </div>
                    </div>
                }
                <div className='edit-button delete' onClick={handleDeleteAccount}>Delete Account</div>
            </div>
        </div>
    );
}