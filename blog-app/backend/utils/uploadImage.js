const cloudinary = require("cloudinary").v2;

async function uploadImage(imagePath) {
  try {
    console.log("inside upload image");
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "blog-app",
    });
    console.log("Image upload in progress");
    return result;
  } catch (error) {
    console.log(error);
  }
}

const deleteImageFromCloudinary = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadImage, deleteImageFromCloudinary };
