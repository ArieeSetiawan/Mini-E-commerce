const cloudinary = require("../config/cloudinary");
const delImage = async (publicID)=>{
    try{
      const dest = await cloudinary.uploader.destroy(publicID);
  
      return dest;
    }
    catch(err){
    throw err;
    }
  }

module.exports = { delImage };