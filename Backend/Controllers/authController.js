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
            throw new Error({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            name,
            email,
            imageUrl,
            password: hashedPassword
        });
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error({ message: 'User does not exists' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error({ message: 'Incorrect password' });
        }
        const token = generateToken(user._id);
        const AI = await User.findById(AI_id);
        res.status(200).json({ token, user, AI, message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function isTokenValid(req, res) {
    try {
        const token = req.headers.authorization;
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(200).json({ user: null, isLoggedIn: false });
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(200).json({ user: null, isLoggedIn: false });
        }
        const AI = await User.findById(AI_id);
        res.status(200).json({ user, AI, isLoggedIn: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}