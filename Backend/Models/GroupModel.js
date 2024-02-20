import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    name: {
        type: 'String',
        required: true
    },
    imageUrl: {
        type: 'String'
    }
},
{
    timestamps: true
});

export const Group = mongoose.model('group', groupSchema);