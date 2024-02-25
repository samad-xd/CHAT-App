import { useDispatch, useSelector } from "react-redux";
import { updateGroupImage } from "../../../APIs/GroupsAPI";
import { addGroup, changeSelectedGroup, removeGroup } from "../../../store/group";
import { useState } from "react";
import Submitting from "../../LoadingComponents/Submitting/Submitting";
import { toast } from "sonner";

export default function EditGroupImage() {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleImageChange(event) {
        setIsSubmitting(true);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const response = await updateGroupImage(group._id, formData);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            dispatch(changeSelectedGroup(response.data.group));
            dispatch(removeGroup(group));
            dispatch(addGroup(response.data.group));
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className="group-edit-image">
            {group.imageUrl &&
                <>
                    <img src={group.imageUrl} alt="profile-picture" />
                    {isSubmitting ?
                        <Submitting /> :
                        <label className='group-edit-button'>
                            Change Picture
                            <input type="file" onChange={handleImageChange} />
                        </label>
                    }
                </>
            }
            {!group.imageUrl &&
                <>
                    <img src="profile-picture.png" alt="profile-picture" />
                    {isSubmitting ?
                        <Submitting /> :
                        <label className='group-edit-button'>
                            Add Picture
                            <input type="file" onChange={handleImageChange} />
                        </label>
                    }
                </>
            }
        </div>
    )
}