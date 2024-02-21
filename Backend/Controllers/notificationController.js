import { Notification } from "../Models/notificationModel.js";

export async function addNotification(req, res) {
    const notification = req.body;
    try {
        const result = await Notification.create(notification);
        res.status(200).json({ notification: result, message: 'notification added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export async function readNotification(req, res) {
    const { notificationId } = req.params;
    try {
        const notification = await Notification.findById(notificationId);
        notification.isRead = true;
        await notification.save();
        res.status(200).json({ notification, message: 'notification read successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find({ to: req.user._id }).populate(['from', 'group']).sort({ createdAt: -1 });
        res.status(200).json({ notifications, message: 'notifications fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export async function deleteGroupNotifications(req, res, next) {
    const { groupId } = req.params;
    try {
        await Notification.deleteMany({ group: groupId });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export async function deleteUserNotifications(req, res, next) {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ to: userId });
        await Notification.deleteMany({ from: userId });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}