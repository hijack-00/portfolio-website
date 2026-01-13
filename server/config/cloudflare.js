const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Configure Cloudflare R2 client
const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
});

// Upload file to Cloudflare R2
const uploadToR2 = async (file, folder = 'uploads') => {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));

        // Return the public URL
        const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;
        return publicUrl;
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw new Error('Failed to upload file');
    }
};

// Delete file from Cloudflare R2
const deleteFromR2 = async (fileUrl) => {
    try {
        // Extract the key from the URL
        const key = fileUrl.replace(`${process.env.CLOUDFLARE_PUBLIC_URL}/`, '');

        const deleteParams = {
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: key,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        return true;
    } catch (error) {
        console.error('Error deleting from R2:', error);
        throw new Error('Failed to delete file');
    }
};

// Get signed URL for private files (optional)
const getSignedUrlFromR2 = async (key, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
        return signedUrl;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw new Error('Failed to get signed URL');
    }
};

module.exports = {
    uploadToR2,
    deleteFromR2,
    getSignedUrlFromR2,
};
