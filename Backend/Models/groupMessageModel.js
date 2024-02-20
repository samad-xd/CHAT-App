import mongoose from 'mongoose';

const groupMessageSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref: 'group',
        required: true
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export const GroupMessage = mongoose.model('group message', groupMessageSchema);