import { OpenAI } from 'openai';
import dotenv from 'dotenv';

import { Chat } from "../Models/chatModel.js";
import { Message } from "../Models/messageModel.js";
import { User } from "../Models/userModel.js";
import { deleteCloudinaryImage } from '../Middlewares/upload.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const AI_id = process.env.AI_ID;

export async function getAllFriends(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('friends');
        res.status(200).json({ friends: user.friends, message: 'Friends fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function getChat(req, res) {
    const { friendId } = req.params;
    try {
        let chat = await Chat.findOne({
            members: { $all: [friendId, req.user._id] }
        });
        if (!chat) {
            chat = await Chat.create({
                members: [friendId, req.user._id]
            });
        }
        res.status(200).json({ chat, message: 'Chat data fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function getMessages(req, res) {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chatId });
        res.status(200).json({ messages, message: 'Messages fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function addMessage(req, res) {
    const message = req.body;
    try {
        await Message.create(message);
        res.status(200).json({ message: 'Message added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function addImage(req, res) {
    const { chatId, senderId } = req.body;
    try {
        let message = {
            chatId,
            senderId,
            type: 'image',
            text: req.file.url
        }
        message = await Message.create(message);
        res.status(200).json({ addedMessage: message, message: 'Message added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function deleteChat(req, res) {
    const { friendId } = req.params;
    try {
        const chat = await Chat.findOne({ members: { $all: [friendId, req.user._id] } });
        const messages = await Message.find({ chatId: chat._id, type: 'image' });
        messages.forEach(async (message) => {
            await deleteCloudinaryImage(message.text);
        });
        await Message.deleteMany({ chatId: chat._id });
        res.status(200).json({ message: 'Chat deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function deleteAllChats(req, res, next) {
    try {
        const chats = await Chat.find({ members: { $in: [req.user._id] } });
        chats.forEach(async (chat) => {
            await Message.deleteMany({ chatId: chat._id });
            await Chat.findByIdAndDelete(chat._id);
        });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function messageAI(req, res) {
    const message = req.body;
    try {
        await Message.create(message);
        let oldMessages = await Message.find({ chatId: message.chatId });
        oldMessages = oldMessages.map(message => {
            const role = message.senderId === AI_id ? 'assistant' : 'user';
            const content = message.text;
            return { role, content };
        });
        const response = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a Friendly AI who responds as a friend." },
                ...oldMessages
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 100
        });
        const newMessage = await Message.create({
            senderId: AI_id,
            chatId: message.chatId,
            text: response.choices[0].message.content
        });
        res.status(200).json({ message: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}