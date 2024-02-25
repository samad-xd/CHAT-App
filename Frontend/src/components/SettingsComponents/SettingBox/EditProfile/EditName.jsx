import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../../../../APIs/usersAPI";
import { changeUser } from "../../../../store/auth";
import Submitting from "../../../LoadingComponents/Submitting/Submitting";
import { toast } from "sonner";

export default function EditName() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.authReducer.user);

    const nameRef = useRef('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleNameChange() {
        const name = nameRef.current.value;
        if (name === user.name) return;
        setIsSubmitting(true);
        const response = await updateName({ name });
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            dispatch(changeUser(response.data.user));
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className='edit-name'>
            <label htmlFor="name">Name :</label>
            <input ref={nameRef} type="text" id='name' defaultValue={user.name} />
            {isSubmitting ?
                <Submitting /> :
                <div className='edit-button' onClick={handleNameChange}>Change Name</div>
            }
        </div>
    )
}