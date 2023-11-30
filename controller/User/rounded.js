import sharp from "sharp";
import got from "got";
const path= require('path');
const fs = require('fs');

const addTextOnImage = async(req, res) => {
  try {

    // const formData = req.fields;

    // const imageBuffer = await got('https://lasepa.s3.amazonaws.com/image.jpg').buffer();

    // const {
    //   images
    // } = req.fields;

    // const form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
 
    
    // })

    const { liveImage } = req.files;

    // Ensure the "public" directory exists in the root folder
    const publicDirPath = path.join(__dirname, '../../public');
    if (!fs.existsSync(publicDirPath)) {
        fs.mkdirSync(publicDirPath);
    }
    
    let newPath = path.join(publicDirPath, liveImage.name);
    let rawData = fs.readFileSync(liveImage.path);
    
    fs.writeFile(newPath, rawData, async function (err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error writing file");
        }
        
    console.log('text')

    const text = 'Your Text';
    // const width = 300; // Set the desired width
    // const height = 300; // Set the desired height
    
    const svgImage = `
        <svg width="${width}" height="${height}">
          <style>
          .title {
            font-size: 20px;
            font-weight: bold;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.7); /* Background color with 70% opacity */
            color: white; /* Text color */
            position: absolute;
            bottom: 10px;
            right: 10px;
            border-radius: 5px;
            width:100px;
           }
          </style>
          <text x="100%" y="100%" fill="white" font-size="20px" font-family="Arial, sans-serif" text-anchor="end" dominant-baseline="hanging" class="title">${text}</text>
        </svg>
    `;
    
    const imageBuffer = await got('https://lasepa.s3.amazonaws.com/G_NSA0_XX_92870i.jpg').buffer();


// Use sharp to get image metadata (width and height)
    const metadata = await sharp(imageBuffer).metadata();

    // Access the width and height
    const width = metadata.width;
    const height = metadata.height;

    console.log('Width:', width);
    console.log('Height:', height);
    const svgBuffer = Buffer.from(svgImage);
    
    const resizedImageBuffer = await sharp(imageBuffer)
      .flatten()
      .resize({ width: width, height: height }) // Adjust the dimensions as needed
      .toBuffer();
    
    const compositeImageBuffer = await sharp(resizedImageBuffer)
      .composite([
        {
          input: svgBuffer,
          gravity: 'southeast',
          offset: {
            left: 10,
            bottom: 10,
          },
        },
      ])
      .toFile(`public/${Date.now()}.png`);
    });


  } catch (error) {
    console.log(error);
  }
}

export default addTextOnImage
