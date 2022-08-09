const cloudinary = require("../config/cloudinary");
const fs = require ('fs')

const upload = async (file, array={ }) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      overwrite: true,
      use_filename: true,
      unique_filename: true,
      ...array
    })
    return res;
    
  } catch (err) {
    throw err;
  }
}


module.exports = { upload };
