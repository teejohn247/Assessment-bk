const multer = require("multer");
const path = require("path");

const uploadType = async function (req, file, cb) {
  try{
    //check attachment extension
    if (!file.originalname.match(/\.(pdf|png|jpg|JPG|doc|docx|jpeg|zip|rar)$/)) {
      req.fileValidationError = "Invalid Extension!";
      return cb(new Error("Invalid Extension!"), false);
    }

    cb(null, true);
  }catch(error){
    console.log(error)
  }
  
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const limit = 8 * 1024 * 1024;
module.exports = {
  storage,
  limit,
  uploadType,
};
