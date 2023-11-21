const multer = require("multer");
const { storage, uploadType, limit } = require("./attachmentFilter");

const attachmentUpload = multer({
  storage: storage,
  limits: { fileSize: limit },
  fileFilter: uploadType,
}).array("files", 5);

const attachmentRequest = async (req, res, next) => {
  try {
    attachmentUpload(req, res, function (err) {
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

module.exports = attachmentRequest;
