import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        }
    ]
},
{
    timestamps: true
});

export const Chat = mongoose.model('chat', chatSchema);