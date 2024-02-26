const multer = require('multer');

// Middleware function to validate profile image
const validateProfileImage = async (req, res, next) => {
    try {
        const { buffer } = req.file;

        // Check if file is missing
        if (!buffer) {
            return res.status(400).send({ error: 'Profile image is required' });
        }

        // Load file-type module dynamically
        const FileType = (await import('file-type')).default;

        // Check file type
        const fileType = await FileType.fromBuffer(buffer);
        if (!fileType || !fileType.mime.startsWith('image')) {
            return res.status(400).send({ error: 'Invalid file type. Only images are allowed.' });
        }

        // Pass the validation
        next();
    } catch (err) {
        // Handle any errors
        console.error('Error validating profile image:', err);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = validateProfileImage;