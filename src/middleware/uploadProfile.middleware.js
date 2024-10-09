
import multer from 'multer';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'src/uploads/');
    },
    filename: (req, file, cb) => {
           // Generate a unique filename for the uploaded avatar
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `profile_${uniqueSuffix}${ext}`);
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
    }
});

// Middleware function to handle file uploads
export const uploadProfile = upload.array("profilePic",5);