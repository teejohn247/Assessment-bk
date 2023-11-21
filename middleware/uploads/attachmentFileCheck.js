const FileType = require("file-type");

const attachmentFileCheck = async (req, res, next) => {
  if (req.files) {
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        let path = await FileType.fromFile(req.files[i].path);

        if (path) {
          let fileType = JSON.parse(JSON.stringify(path)).mime;
          
          if (
            !fileType.match(
              /(application\/pdf|image\/png|image\/jpg|image\/jpeg)$/
            )
          ) {
            res.status(400).send({ message: "Only pdf and word file(s) are allowed!" });
            return;
          }
        } else {
          res.status(400).send({
            message: "Something went wrong, file(s) is corrupt or unreadable",
          });
          return;
        }
      }
    }
  }

  next();
};
module.exports = attachmentFileCheck;
