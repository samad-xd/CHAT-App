import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, removeFromGroup } from "../../../APIs/GroupsAPI";
import { changeSelectedGroup, removeGroup } from "../../../store/group";
import { useState } from "react";
import Submitting from "../../LoadingComponents/Submitting/Submitting";
import { toast } from "sonner";

export default function GroupLeaveOrDelete({ setShowGroupDetails }) {

    const user = useSelector(state => state.authReducer.user);

    const group = useSelector(state => state.groupReducer.selectedGroup);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    function confirmLeave() {
        toast('Are you sure?', {
            action: {
                label: 'Leave Group',
                onClick: () => handleLeaveGroup()
            },
            cancel: {
                label: 'Cancel',
            },
            duration: 2000
        })
    }

    async function handleLeaveGroup() {
        setIsSubmitting(true);
        const response = await removeFromGroup(group._id, user._id);
        if (response.status === 200) {
            toast.success('Group left successfully', { duration: 2000 });
            setShowGroupDetails(false);
            dispatch(changeSelectedGroup(null));
            dispatch(removeGroup(group));
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    function confirmDelete() {
        toast('Are you sure?', {
            action: {
                label: 'Delete Group',
                onClick: () => handleDeleteGroup()
            },
            cancel: {
                label: 'Cancel',
            },
            duration: 2000
        })
    }

    async function handleDeleteGroup() {
        setIsSubmitting(true);
        const response = await deleteGroup(group._id);
        if (response.status === 200) {
            toast.success('Group deleted successfully', { duration: 2000 });
            setShowGroupDetails(false);
            dispatch(changeSelectedGroup(null));
            dispatch(removeGroup(group));
        } else {
            toast.error(response.message, { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div className='group-leave-delete'>
            {isSubmitting ?
                <Submitting /> :
                <>
                    <div className="group-red-button" onClick={confirmLeave}>Leave Group</div>
                    <div className='group-red-button' onClick={confirmDelete}>Delete Group</div>
                </>
            }
        </div>
    )
}