import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../../../../store/auth";
import { updatePassword } from "../../../../APIs/usersAPI";
import Submitting from "../../../LoadingComponents/Submitting/Submitting";

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
        const responseData = await updatePassword({ password, confirmPassword });
        dispatch(changeUser(responseData.user));
        setIsSubmitting(false);
        setShowChangePasssword(false);
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