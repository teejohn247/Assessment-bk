import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db'
import userRouter from './routes/adminRoute';
import Debug from 'debug';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import multer from 'multer';
import s3 from './config/Aws-S3';
const formidable = require('express-formidable');
s3
const fs = require('fs');


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


app.post('/upload-img', (req, res) => {
  const image = req.files.images;
  // Specify the bucket name and file path
  const bucketName = process.env.AWS_BUCKET_NAME;
  const filePath = image.path;
  const fileStream = fs.createReadStream(filePath);
  
  // Set the S3 upload parameters
  const params = {
    Bucket: bucketName,
    Key: image.name, // Set the destination path in S3
    Body: fileStream,
    ContentType: image.type // Set the content type of the file
  };
  
  // Upload the file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully. S3 location:', data);
    } 
  });
});


app.use('/api/v1', userRouter);

server.listen(process.env.PORT || 2000, () => {
  server.timeout = 60000;
  console.log(`Server has started. ${port}`)
})


export default app;
