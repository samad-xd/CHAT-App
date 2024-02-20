import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

import { Group } from '../Models/GroupModel.js';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.MULTER_TEMP_STORAGE_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

export const upload = multer({ storage });

export async function cloudinaryUpload(req, res, next) {

    const imagePath = req.file?.path;

    if (!imagePath) {
        return next();
    }

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const uploadedImageData = await cloudinary.uploader.upload(imagePath, options);
        req.file = uploadedImageData;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

export async function cloudinaryDelete(req, res, next) {

    const imageUrl = req.user.imageUrl;

    if (!imageUrl) {
        return next();
    }

    const publicId = imageUrl.split('/').pop().split('.')[0];

    try {
        await cloudinary.uploader.destroy(publicId);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

export async function cloudinaryGroupImageDelete(req, res, next) {

    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    const imageUrl = group.imageUrl;

    if (!imageUrl) {
        return next();
    }

    const publicId = imageUrl.split('/').pop().split('.')[0];

    try {
        await cloudinary.uploader.destroy(publicId);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}