import { useDispatch, useSelector } from "react-redux";
import { updateGroupImage } from "../../../APIs/GroupsAPI";
import { addGroup, changeSelectedGroup, removeGroup } from "../../../store/group";
import { useState } from "react";
import Submitting from "../../LoadingComponents/Submitting/Submitting";

export default function EditGroupImage() {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleImageChange(event) {
        setIsSubmitting(true);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const responseData = await updateGroupImage(group._id, formData);
        dispatch(changeSelectedGroup(responseData.group));
        dispatch(removeGroup(group));
        dispatch(addGroup(responseData.group));
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