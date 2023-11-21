const multer = require("multer");
const path = require("path");
const FileType = require("file-type");

const imageType = async function (req, file, cb) {
  // Accept images only
  //check image extension
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Invalid Extension!";
    return cb(new Error("Invalid Extension!"), false);
  }

  cb(null, true);
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

const limit = 5 * 1024 * 1024;
module.exports = {
  storage,
  limit,
  imageType,
};
