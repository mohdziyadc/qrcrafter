import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const uploadImage = async (imageUrl: string) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imageUrl, options);
    return result.secure_url;
  } catch (error) {
    throw new Error("[IMAGE UPLOAD ERROR] " + error);
  }
};

export default uploadImage;

// const getImage = async (publicId: string) => {
//   try {
//     const result = await cloudinary.api.resource(publicId)

//   } catch (error) {
//     throw new Error("[IMAGE FETCH ERROR] " + error);
//   }
// };
