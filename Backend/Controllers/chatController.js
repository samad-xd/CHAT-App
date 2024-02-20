import { OpenAI } from 'openai';
import dotenv from 'dotenv';

import { Chat } from "../Models/chatModel.js";
import { Message } from "../Models/messageModel.js";
import { User } from "../Models/userModel.js";

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
        console.log(error);
        res.status(500).json(error);
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
        console.log(error);
        res.status(500).json(error);
    }
}

export async function getMessages(req, res) {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chatId });
        res.status(200).json({ messages, message: 'Messages fetched successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export async function addMessage(req, res) {
    const message = req.body;
    try {
        await Message.create(message);
        res.status(200).json({ message: 'Message added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
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
        console.log(error);
        res.status(500).json(error);
    }
}