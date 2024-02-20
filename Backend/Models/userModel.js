import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    friends: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ],
    pendingRequests: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ],
    sentRequests: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ],
    blocked: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
        }
    ]
},
{
    timestamps: true
});

export const User = mongoose.model('user', userSchema);