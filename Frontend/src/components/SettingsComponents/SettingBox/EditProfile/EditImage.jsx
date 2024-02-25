import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../../../../APIs/usersAPI";
import { changeUser } from "../../../../store/auth";
import { useState } from "react";
import Submitting from "../../../LoadingComponents/Submitting/Submitting";
import { toast } from "sonner";

export default function EditImage() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.authReducer.user);

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleImageChange(event) {
        setIsSubmitting(true);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const response = await updateProfilePicture(formData);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            dispatch(changeUser(response.data.user));
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className="edit-image">
            {user.imageUrl &&
                <>
                    <img src={user.imageUrl} alt="profile-picture" />
                    {isSubmitting ?
                        <Submitting /> :
                        <label className='edit-button'>
                            Change Picture
                            <input type="file" onChange={handleImageChange} />
                        </label>
                    }
                </>
            }
            {!user.imageUrl &&
                <>
                    <img src="profile-picture.png" alt="profile-picture" />
                    {isSubmitting ?
                        <Submitting /> :
                        <label className='edit-button'>
                            Add Picture
                            <input type="file" onChange={handleImageChange} />
                        </label>
                    }
                </>
            }
        </div>
    )
}