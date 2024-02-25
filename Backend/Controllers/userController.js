import bcrypt from 'bcrypt';
import { User } from "../Models/userModel.js";

export async function findFriends(req, res) {
    const name = req.params.name;
    try {
        const result = await User.find({ name });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function getAllFriendRequests(req, res) {
    try {
        const user = await User.findById(req.user._id).populate(['pendingRequests', 'sentRequests']);
        res.status(200).json({ sentRequests: user.sentRequests, pendingRequests: user.pendingRequests });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function addFriendRequest(req, res) {
    const friendId = req.params.friendId;
    try {
        const friend = await User.findById(friendId);
        const user = req.user;
        friend.pendingRequests.push(user._id);
        user.sentRequests.push(friend._id);
        await user.save();
        await friend.save();
        res.status(200).json({ user, message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function acceptFriendRequest(req, res) {
    const friendId = req.params.friendId;
    try {
        const friend = await User.findById(friendId);
        const user = req.user;
        user.friends.push(friend._id);
        friend.friends.push(user._id);
        const pendingRequests = user.pendingRequests.filter(id => id.toString() !== friend._id.toString());
        user.pendingRequests = pendingRequests;
        const sentRequests = friend.sentRequests.filter(id => id.toString() !== user._id.toString());
        friend.sentRequests = sentRequests;
        await user.save();
        await friend.save();
        res.status(200).json({ user, message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function rejectFriendRequest(req, res) {
    const friendId = req.params.friendId;
    try {
        const friend = await User.findById(friendId);
        const user = req.user;
        const pendingRequests = user.pendingRequests.filter(id => id.toString() !== friend._id.toString());
        user.pendingRequests = pendingRequests;
        const sentRequests = friend.sentRequests.filter(id => id.toString() !== user._id.toString());
        friend.sentRequests = sentRequests;
        await user.save();
        await friend.save();
        res.status(200).json({ user, message: 'Friend request rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function cancelFriendRequest(req, res) {
    const friendId = req.params.friendId;
    try {
        const friend = await User.findById(friendId);
        const user = req.user;
        const pendingRequests = friend.pendingRequests.filter(id => id.toString() !== user._id.toString());
        friend.pendingRequests = pendingRequests;
        const sentRequests = user.sentRequests.filter(id => id.toString() !== friend._id.toString());
        user.sentRequests = sentRequests;
        await user.save();
        await friend.save();
        res.status(200).json({ user, message: 'Friend request cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function removeFriend(req, res) {
    const friendId = req.params.friendId;
    try {
        const friend = await User.findById(friendId);
        const user = req.user;
        const friendFriends = friend.friends.filter(id => id.toString() !== user._id.toString());
        friend.friends = friendFriends;
        const friends = user.friends.filter(id => id.toString() !== friend._id.toString());
        user.friends = friends;
        await user.save();
        await friend.save();
        res.status(200).json({ user, message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function getUserProfile(req, res) {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate('friends');
        res.status(200).json({ user, message: 'User profile fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function blockUser(req, res) {
    const userId = req.params.userId;
    try {
        const user = req.user;
        const userFriends = user.friends.filter(friend => friend.toString() !== userId.toString());
        user.friends = userFriends;
        user.blocked.push(userId);
        await user.save();
        const friend = await User.findById(userId);
        const friends = friend.friends.filter(friend => friend.toString() !== user._id.toString());
        friend.friends = friends;
        await friend.save();
        res.status(200).json({ user, message: 'User blocked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function unblockUser(req, res) {
    const userId = req.params.userId;
    try {
        const user = req.user;
        const blockedUsers = user.blocked.filter(friend => friend.toString() !== userId.toString());
        user.blocked = blockedUsers;
        user.friends.push(userId);
        await user.save();
        const friend = await User.findById(userId);
        friend.friends.push(user._id);
        await friend.save();
        res.status(200).json({ user, message: 'User unblocked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function getBlockedUsers(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('blocked');
        res.status(200).json({ blockedUsers: user.blocked, message: 'Fetched all blocked users successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function updateName(req, res) {
    const { name } = req.body;
    try {
        const user = req.user;
        user.name = name;
        await user.save();
        res.status(200).json({ user, message: 'Name changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function updatePassword(req, res) {
    const { password } = req.body;
    try {
        const user = req.user;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ user, message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function updateProfilePicture(req, res) {
    const imageUrl = req.file.url;
    try {
        const user = req.user;
        user.imageUrl = imageUrl;
        await user.save();
        res.status(200).json({ user, message: 'Profile Picture changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function deleteAcount(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}