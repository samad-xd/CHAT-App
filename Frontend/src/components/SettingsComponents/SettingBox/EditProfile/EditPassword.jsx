import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../../store/auth";
import { updatePassword } from "../../../../APIs/usersAPI";
import Submitting from "../../../LoadingComponents/Submitting/Submitting";
import { toast } from "sonner";

export default function EditPassword() {

    const dispatch = useDispatch();

    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const [showChangePassword, setShowChangePasssword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handlePasswordChange() {
        setIsSubmitting(true);
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if(password !== confirmPassword) {
            toast.error('Passwords do not match.', { duration: 2000 });
            setIsSubmitting(false);
            return;
        }
        if(password.length < 8) {
            toast.error('Passwords requires atleast 8 characters.', { duration: 2000 });
            setIsSubmitting(false);
            return;
        }
        const response = await updatePassword({ password, confirmPassword });
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            dispatch(changeUser(response.data.user));
            setShowChangePasssword(false);
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <>
            {!showChangePassword && <div className='edit-button' onClick={() => setShowChangePasssword(true)}>Change Password</div>}
            {showChangePassword &&
                <div className='edit-password'>
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <input ref={confirmPasswordRef} type="password" placeholder='Confirm Password' />
                    <div className='edit-password-buttons'>
                        {isSubmitting ?
                            <Submitting /> :
                            <>
                                <div className='edit-button' onClick={handlePasswordChange}>Update Password</div>
                                <div className='edit-button delete' onClick={() => setShowChangePasssword(false)}>Cancel</div>
                            </>
                        }
                    </div>

                </div>
            }
        </>
    )
}