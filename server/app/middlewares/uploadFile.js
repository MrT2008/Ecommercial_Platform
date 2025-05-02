const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadPaths = {
    product: path.join(__dirname, '../../../client/public/Pictures/product'),
    promotion: path.join(__dirname, '../../../client/public/Pictures/promotion'),
    shop: path.join(__dirname, '../../../client/public/Pictures/shop'),
    announcement: path.join(__dirname, '../../../client/public/Pictures/announcement'),
    user: path.join(__dirname, '../../../client/public/Pictures/user')
};
// Ensure directories exist
Object.values(uploadPaths).forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = req.body.type; // now it's safely available due to setUploadType
        const uploadPath = uploadPaths[type];

        if (!uploadPath) {
            console.log('Invalid upload type:', type);
            return cb(new Error('Invalid upload type'), null);
        }

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