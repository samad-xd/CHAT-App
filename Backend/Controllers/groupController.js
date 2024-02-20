import { Group } from "../Models/GroupModel.js";
import { GroupMessage } from "../Models/groupMessageModel.js";
import { User } from "../Models/userModel.js";

export async function createGroup(req, res) {
    const { groupName, friends } = req.body;
    const imageUrl = req.file?.url;
    try {
        const group = await Group.create({ name: groupName, members: friends, imageUrl });
        res.status(200).json({ group, message: 'Group created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function deleteGroup(req, res) {
    const { groupId } = req.params;
    try {
        await Group.findByIdAndDelete(groupId);
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getAllGroups(req, res) {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: { $in: [userId] } });
        res.status(200).json({ groups, message: 'Groups fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getGroupMembers(req, res) {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId).populate('members');
        res.status(200).json({ members: group.members, message: 'Groups fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getMembersNotInGroup(req, res) {
    const { groupId } = req.params;
    try {
        const user = await User.findById(req.user._id).populate('friends');
        const { members } = await Group.findById(groupId).populate('members');
        const friends = user.friends.filter(friend => {
            return !(members.some(member => member._id.toString() === friend._id.toString()));
        });
        res.status(200).json({ friends, message: 'Groups fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getGroupMessages(req, res) {
    const { groupId } = req.params;
    try {
        const groupMessages = await GroupMessage.find({ groupId })
        res.status(200).json({ groupMessages, message: 'Group messages fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function addGroupMessage(req, res) {
    const groupMessage = req.body;
    try {
        await GroupMessage.create(groupMessage);
        res.status(200).json({ message: 'Group message added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function addToGroup(req, res) {
    const { userId, groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        group.members.push(userId);
        await group.save();
        res.status(200).json({ message: 'User added Group successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function removeFromGroup(req, res) {
    const { userId, groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        const members = group.members.filter(id => id.toString() !== userId.toString());
        group.members = members;
        await group.save();
        res.status(200).json({ message: 'User removed from Group successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function updateGroupName(req, res) {
    const { groupId } = req.params;
    const { name } = req.body;
    try {
        const group = await Group.findById(groupId);
        group.name = name;
        await group.save();
        res.status(200).json({ group, message: 'Group name updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function updateGroupImage(req, res) {
    const { groupId } = req.params;
    const imageUrl = req.file.url;
    try {
        const group = await Group.findById(groupId);
        group.imageUrl = imageUrl;
        await group.save();
        res.status(200).json({ group, message: 'Group image updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}