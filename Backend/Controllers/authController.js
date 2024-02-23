import bcrypt from 'bcrypt';

import { User } from "../Models/userModel.js";
import { generateToken, verifyToken } from '../utils/tokenUtils.js';

const AI_id = process.env.AI_ID;

export async function signup(req, res) {
    const { name, email, password } = req.body;
    const imageUrl = req.file?.url;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            name,
            email,
            imageUrl,
            password: hashedPassword
        });
        res.status(200).json({ message: 'Signup Success.' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }
        const token = generateToken(user._id);
        const AI = await User.findById(AI_id);
        res.status(200).json({ token, user, AI, message: 'Login Success' });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }
}

export async function isTokenValid(req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(200).json({ user: null, AI: null, isLoggedIn: false });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(200).json({ user: null, AI: null, isLoggedIn: false });
        }
        const AI = await User.findById(AI_id);
        res.status(200).json({ user, AI, isLoggedIn: true });
    } catch (error) {
        res.status(500).json({ message: 'Server is having some issues.' });
    }

}