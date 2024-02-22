import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../../../APIs/usersAPI';
import { updateLogoutState } from '../../../../store/auth';
import { resetChatState } from '../../../../store/chat';
import { resetGroupState } from '../../../../store/group';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Submitting from '../../../LoadingComponents/Submitting/Submitting';
import { makeToast } from '../../../../utils/toast';

export default function DeleteAccount() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleDeleteAccount() {
        setIsSubmitting(true);
        const response = await deleteAccount();
        if(!makeToast(response)) return;
        dispatch(updateLogoutState());
        dispatch(resetChatState());
        dispatch(resetGroupState());
        setIsSubmitting(false);
        navigate('/login');
    }

    return (
        <>
            {isSubmitting ?
                <Submitting /> :
                <div className='edit-button delete' onClick={handleDeleteAccount}>Delete Account</div>
            }
        </>
    );
}