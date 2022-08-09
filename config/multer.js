const multer  = require('multer')

const fileFilter = (req, file, cb) =>{
  if (!file) cb('File cannot be empty');
  if (
    file.mimetype !== 'image/png' &&
    file.mimetype !== 'image/jpg' &&
    file.mimetype !== 'image/jpeg'
  )cb({
    message: 'Unsupport file format',
    support: 'jpg/png/jpeg'
  });
  else cb(null, true);
}

const storage = multer.diskStorage({  
    destination: function (req, file, cb) {
      cb(null, './file')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ "--" + file.originalname)
    }
  })

  module.exports = multer ({
    storage,
    fileFilter,
    limits:{
        fileSize: 500_000,
        fieldNameSize: 1_000_000
    }
  })