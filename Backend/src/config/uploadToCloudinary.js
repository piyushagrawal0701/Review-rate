const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("Empty file buffer"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "review-rate",
        resource_type: "image",
        timeout: 60000,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;