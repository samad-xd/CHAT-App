import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../../../APIs/usersAPI';
import { updateLogoutState } from '../../../../store/auth';
import { resetChatState } from '../../../../store/chat';
import { resetGroupState } from '../../../../store/group';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Submitting from '../../../LoadingComponents/Submitting/Submitting';
import { toast } from 'sonner';

export default function DeleteAccount() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    function confirmDelete() {
        toast('Are you sure?', {
            action: {
                label: 'Delete Account',
                onClick: () => handleDeleteAccount()
            },
            cancel: {
                label: 'Cancel',
            },
            duration: 2000
        })
    }

    async function handleDeleteAccount() {
        setIsSubmitting(true);
        const response = await deleteAccount();
        if (response.status !== 200) {
            toast.error(response.message, { duration: 2000 });
            return;
        }
        toast.success(response.message, { duration: 2000 });
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
                <div className='edit-button delete' onClick={confirmDelete}>Delete Account</div>
            }
        </>
    );
}