import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['friends', 'groups'],
        required: true
    },
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'group'
    },
    action: {
        type: String,
        enum: ['sent', 'accepted']
    },
    isRead: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

export const Notification = mongoose.model('notification', notificationSchema);