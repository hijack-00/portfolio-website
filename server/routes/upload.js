const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { uploadToR2 } = require('../config/cloudflare');

// @route   POST /api/upload
// @desc    Upload file to Cloudflare R2
// @access  Private (Admin)
router.post('/', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const folder = req.body.folder || 'uploads';
        const fileUrl = await uploadToR2(req.file, folder);

        res.json({
            message: 'File uploaded successfully',
            url: fileUrl,
            fileName: req.file.originalname
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
});

module.exports = router;
