import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.ObjectId,
        ref: 'chat',
        required: true
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image'],
        default: 'text'
    },
    text: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export const Message = mongoose.model('message', messageSchema);