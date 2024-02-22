import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGroupName } from "../../../APIs/GroupsAPI";
import { addGroup, changeSelectedGroup, removeGroup } from "../../../store/group";
import Submitting from "../../LoadingComponents/Submitting/Submitting";
import { makeToast } from "../../../utils/toast";

export default function EditGroupName() {

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const dispatch = useDispatch();

    const nameRef = useRef('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleNameChange() {
        const name = nameRef.current.value;
        if (name === group.name) return;
        setIsSubmitting(true);
        const response = await updateGroupName(group._id, { name });
        if(!makeToast(response)) return;
        dispatch(changeSelectedGroup(response.data.group));
        dispatch(removeGroup(group));
        dispatch(addGroup(response.data.group));
        setIsSubmitting(false);
    }

    return (
        <div className='group-edit-name'>
            <label htmlFor="name">Name :</label>
            <input ref={nameRef} type="text" id='name' defaultValue={group.name} />
            {isSubmitting ?
                <Submitting /> :
                <div className='group-edit-button' onClick={handleNameChange}>Change Name</div>
            }
        </div>
    )
}