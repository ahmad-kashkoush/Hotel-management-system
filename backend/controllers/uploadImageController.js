const AppError = require("../AppError");
const catchAsync = require("../utils/catchAsync");
const multer = require('multer');
const { Storage } = require("@google-cloud/storage");
const path = require("path")
const storage = new Storage({
    keyFilename: path.resolve(process.env.GOOGLE_CLOUD_KEY_FILE),
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,

});
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);


exports.upload = multer({ storage: multer.memoryStorage() });

exports.uploadImage = catchAsync(async (req, res, next) => {
    // req.file
    const file = req.file;
    const fileName = req.body.fileName;
    const bucketFolderName = req.body.bucketFolderName;
    console.log(bucketFolderName);
    // ?? blob 
    const blob = bucket.file(`${bucketFolderName}/${fileName}`);
    // ?? createWriteStream 
    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: { contentType: file.mimetype },
    });
    // on error
    blobStream.on("error", (err) => {
        throw new AppError("UploadingError: blobStream error", 500, err);
    })
    // on finish
    blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        res.status(200).json({
            status: "success",
            message: "successfully uploaded image",
            imageUrl: publicUrl
        })
    });

    blobStream.end(file.buffer);
    // on end


});

