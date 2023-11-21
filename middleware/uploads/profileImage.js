const multer = require("multer");
const { storage, imageType, limit } = require("./imageFilter");

const imageUpload = multer({
  storage: storage,
  limits: { fileSize: limit },
  fileFilter: imageType,
}).single("file");

const imageRequest = async (req, res, next) => {
  try {
    imageUpload(req, res, function (err) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
        return;
      }

      // Everything went fine.
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = imageRequest;
