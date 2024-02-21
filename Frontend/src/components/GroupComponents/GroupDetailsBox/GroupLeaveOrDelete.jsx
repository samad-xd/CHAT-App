import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, removeFromGroup } from "../../../APIs/GroupsAPI";
import { changeSelectedGroup, removeGroup } from "../../../store/group";
import { useState } from "react";
import Submitting from "../../LoadingComponents/Submitting/Submitting";

export default function GroupLeaveOrDelete({ setShowGroupDetails }) {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    async function handleLeaveGroup() {
        setIsSubmitting(true);
        await removeFromGroup(group._id, user._id);
        setShowGroupDetails(false);
        dispatch(changeSelectedGroup(null));
        dispatch(removeGroup(group));
        setIsSubmitting(false);
    }

    async function handleDeleteGroup() {
        setIsSubmitting(true);
        await deleteGroup(group._id);
        setShowGroupDetails(false);
        dispatch(changeSelectedGroup(null));
        dispatch(removeGroup(group));
        setIsSubmitting(false);
    }

    return (
        <div className='group-leave-delete'>
            {isSubmitting ?
                <Submitting /> :
                <>
                    <div className="group-red-button" onClick={handleLeaveGroup}>Leave Group</div>
                    <div className='group-red-button' onClick={handleDeleteGroup}>Delete Group</div>
                </>
            }
        </div>
    )
}