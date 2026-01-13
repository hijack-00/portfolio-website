const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.apk')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, PDFs, and APKs are allowed!'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
});

module.exports = upload;
