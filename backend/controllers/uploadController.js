import path from 'path';
import fs from 'fs';
import { AppError } from '../utils/AppError.js';


// Try to load cloudinary — gracefully degrade to local storage if not configured
let cloudinary = null;
const tryLoadCloudinary = async () => {
    if (
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    ) {
        try {
            const { v2 } = await import('cloudinary');
            v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
            cloudinary = v2;
        } catch (e) {
            console.warn('Cloudinary not available, using local storage fallback.');
        }
    }
};

tryLoadCloudinary();


export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded.', 400, 'NO_FILE');
        }

        let imageUrl;

        if (cloudinary) {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'zmarket',
                resource_type: 'image'
            });
            imageUrl = result.secure_url;

            // Remove temp file after upload
            fs.unlinkSync(req.file.path);
        } else {
            // Local storage — serve from /uploads
            const fileName = req.file.filename || req.file.originalname;
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
        }

        res.json({
            success: true,
            message: 'Image uploaded successfully.',
            data: { url: imageUrl },
            url: imageUrl
        });
    } catch (error) {
        next(error);
    }
};


export const uploadMultiple = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            throw new AppError('No files uploaded.', 400, 'NO_FILES');
        }

        const urls = [];

        for (const file of req.files) {
            let imageUrl;

            if (cloudinary) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'zmarket',
                    resource_type: 'image'
                });
                imageUrl = result.secure_url;
                fs.unlinkSync(file.path);
            } else {
                const fileName = file.filename || file.originalname;
                imageUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
            }

            urls.push(imageUrl);
        }

        res.json({
            success: true,
            message: `${urls.length} images uploaded successfully.`,
            data: { urls },
            urls
        });
    } catch (error) {
        next(error);
    }
};
