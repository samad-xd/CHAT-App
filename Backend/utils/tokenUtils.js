import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(id) {
    return jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return false;
        }
        return decoded;
    })
}