const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = async () => {
  try {
    await cloudinary.config({
      cloud_name: "dvfu9jj8",
      api_key: "415469225888581",
      api_secret: "AaM42UhTCuoiz_e0dRrraoNK7iI",
    });

    console.log("Cloudinary configuration sucessfull.");
  } catch (error) {
    console.log("Error occured during cloudinary configuration.");
    console.log(error);
  }
};

module.exports = cloudinaryConfig;
