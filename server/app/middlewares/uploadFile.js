const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadPath = path.join(__dirname, '../../../client/public/Pictures/product');
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1024 * 10 }, // 10 GB
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/gif',
            'image/webp',
            'image/bmp',
            'image/tiff'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

module.exports = upload;
