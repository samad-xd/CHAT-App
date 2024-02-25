import { useState } from "react";
import { unblockUser } from "../../../../APIs/usersAPI";
import { toast } from "sonner";
import Submitting from "../../../LoadingComponents/Submitting/Submitting";

export default function BlockedUser({ user, blockedUsers, setBlockedUsers }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleUnblock() {
        setIsSubmitting(true);
        const response = await unblockUser(user._id);
        if (response.status === 200) {
            toast.success(response.message, { duration: 2000 });
            const users = blockedUsers.filter(x => x._id !== user._id);
            setBlockedUsers(users);
        } else {
            toast.error('Failed to unblock', { duration: 2000 });
        }
        setIsSubmitting(false);
    }

    return (
        <div key={user._id} className="blocked-user">
            {user.imageUrl ? <img src={user.imageUrl} alt="Profile Picture" /> : <img src="profile-picture.png" alt="Profile Picture" />}
            <div className='blocked-user-name'>{user.name}</div>
            {isSubmitting ? <Submitting /> : <div className="unblock-button" onClick={handleUnblock}>Unblock</div>}
        </div>
    );
}