import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file: any, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
    }
};

// config do multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single('file');

// process upload
export const uploadImage = async (file: any): Promise<string> => {
    return `/uploads/${file.filename}`;
};

// delete image
export const deleteImage = async (imageUrl: string): Promise<boolean> => {
    if (!imageUrl) return false;

    const filename = path.basename(imageUrl);
    const imagePath = path.join(uploadDir, filename);

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        return true;
    }

    return false;
};