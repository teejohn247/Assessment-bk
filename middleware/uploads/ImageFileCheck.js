const FileType = require("file-type");

const ImageFileCheck = async (req, res, next) => {
  try{
  if (!req.file) {
    res.status(400).send({ message: "No file uploaded." });
    return;
  }

  // check file type
  let path = await FileType.fromFile(req.file.path);
  if (path) {
    let fileType = JSON.parse(JSON.stringify(path)).mime;

    if (!fileType.match(/(image\/png|image\/jpg|image\/jpeg)$/)) {
      res.status(400).send({ message: "Only image files are allowed!" });
      return;
    }
  } else {
    res
      .status(400)
      .send({ message: "Something went wrong, file is corrupt or unreadable" });
    return;
  }

  next();
  }catch(error){
    console.log(error)
  }
};
module.exports = ImageFileCheck;
