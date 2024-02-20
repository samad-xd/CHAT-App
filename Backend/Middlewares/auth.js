import { User } from "../Models/userModel.js";
import { verifyToken } from "../utils/tokenUtils.js";

export default async function isAuth(req, res, next) {
    try {
        const token = req.headers.authorization;
        const decodedUser = verifyToken(token);
        if (!decodedUser) {
            throw new Error({ message: 'Session expired' });
        }
        req.user = await User.findById(decodedUser.userId);
        if(!req.user) {
            return res.status(404).json({message: 'User Not Found'});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}