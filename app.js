import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db'
import userRouter from './routes/adminRoute';
import Debug from 'debug';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import multer from 'multer';
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const formidable = require('express-formidable');

const upload = multer()

const app = express();
dotenv.config();

app.use(express.json({limit : 52428800}));
// app.use(upload.single());÷
app.use(formidable());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   parameterLimit: 100000,
//   extended: true 
// }))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);
const { Server } = require("socket.io");



app.use(express.static('public'));






const hasBotResult = (result) => {
  return result && result.name;
}


// attach middleware



// app.use(logger('dev'));
// app.use(express.static(__dirname + '/public'));

app.use(express.static('public')); 
app.use('/images', express.static('images'));

// app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({
  limit: '50mb'
}));
app.use(cors());
app.options('*', cors());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "*");
  next();
};
app.use(allowCrossDomain);


const port = process.env.PORT || 2000;
const debug = Debug('http');

connectDb()


let hostname = '0.0.0.0'

app.get('/test', (req, res) => {
  res.json({
    message: 'Welcome to Nigenius SMS Api'
  });
});


app.post("/audio/upload", async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      // return res.send(err);
      console.log(err)
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const { path } = req.files; // file becomes available in req at this point

    const fName = req.files.name;
    console.log(fName);
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "auto",
        public_id: `AudioUploads/${fName}`,
      },

      // Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
});




app.use('/api/v1', userRouter);

server.listen(process.env.PORT || 2000, () => console.log(`Server has started. ${port}`));

export default app;
