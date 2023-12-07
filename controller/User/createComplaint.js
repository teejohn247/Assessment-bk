
import dotenv from 'dotenv';
import User from '../../model/Lasepa';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../config/email';
import cloudinary from '../../config/cloudinary';
import { emailTemp } from '../../emailTemplate';
import moment from 'moment';
import csvDownload from 'json-to-csv-export'
import uploadFiles from '../../middleware/uploadImage';
import sharp from "sharp";
import got from "got";
import axios from "axios";
import LocalFileData from 'get-file-object-from-local-path'
import uploadWaterMark from '../../middleware/watermarkedImage';



const path= require('path');
const fs = require('fs');

dotenv.config();


const  useComplaint = async (req, res) => {

  try {

    const formData = req.fields;

    const {
        title,
        firstName,
        lastName,
        phoneNumber,
        email,
        lasaraaNumber,
        typeOfPollution,
        typeOfOrganizationCausingPollution,
        sourceOfPollution,
        addressOfThePollution,
        lga,
        briefDescriptionOfNoiseComplaint,
        entries,
        previousComplaintNumber,   
        howDidYouHearAboutLasepa,
        maxDecibel,
        additionalComments,
        geoLocation

    } = req.fields;
    

    const { 
      evidenceDocumentsAndPDFs,
      evidenceAudio,
      evidenceVideo,
      evidencePictures,
      liveVideo,
      liveAudio,
      liveImage
     } = req.files;

    console.log(req.files.liveImage)
     let imageCloud;
     let geoImage;
     let audioCloud;
     let videoCloud;
     let documentsCloud;
     let liveImageCloud;
     let liveVideoCloud;
     let liveAudioCloud;
     let evidenceIma;

    //  console.log(req.files)

     if(evidencePictures){
      imageCloud = await uploadFiles(evidencePictures);
      // console.log({imageCloud})
     }

     if(evidenceVideo){
       videoCloud = await uploadFiles(evidenceVideo);

     }
    
    if(evidenceAudio){
      audioCloud = await uploadFiles(evidenceAudio);
      // console.log({audioCloud})
     }
  
     if(evidenceDocumentsAndPDFs){
      documentsCloud = await uploadFiles(evidenceDocumentsAndPDFs);
      // console.log({documentsCloud})
     }

     if(liveImage){
       liveImageCloud = await uploadFiles(liveImage);
       // console.log({liveImageCloud})
     }

     if(liveVideo){
      liveVideoCloud = await uploadFiles(liveVideo);
      // console.log({liveVideoCloud})
     }

    if(liveAudio){
      liveAudioCloud = await uploadFiles(liveAudio);
      // console.log({liveAudioCloud})
    }
   

    let complaintNumber = String(Date.now())


     // Ensure the "public" directory exists in the root folder
const publicDirPath = path.join(__dirname, '../../public');
if (!fs.existsSync(publicDirPath)) {
    fs.mkdirSync(publicDirPath);
}


console.log({liveImage})



if(evidencePictures){


  let newPath = path.join(publicDirPath, evidencePictures.name);
  let rawData = fs.readFileSync(evidencePictures.path);
  
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
          font-size: 50px;
          font-weight: bold;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.7); /* Background color with 70% opacity */
          color: white; /* Text color */
          position: absolute;
          bottom: 10px;
          right: 10px;
          border-radius: 5px;
          width:100%;
          height: 100vh;
         }
        </style>
  
       
        <text  x="100%" y="100%" dy="-180px" dx="-40px" fill="white" font-size="50px" font-family="Arial, sans-serif" text-anchor="end" dominant-baseline="hanging" class="title">
        Location: ${geoLocation}
        </text>
        <text x="100%" y="100%"  dy="-50%" dx="-40px" fill="white" font-size="50px" font-family="Arial, sans-serif" text-anchor="end" dominant-baseline="hanging" class="title">
        Date: ${moment().format('llll')}
        </text>
  
      </svg>
  `;
  
  const imageBuffer = await got(imageCloud).buffer();
  
  console.log({imageBuffer})
  
  
  // Use sharp to get image metadata (width and height)
  const metadata = await sharp(imageBuffer).metadata();
  
  console.log({metadata})
  
  // Access the width and height
  const width = metadata.width < 800 ? metadata.width * 10 : metadata.width;
  const height = metadata.height < 800 ? metadata.height * 10 : metadata.height;
  
  console.log('Width:', width);
  console.log('Height:', height);
  const svgBuffer = Buffer.from(svgImage);
  
  const resizedImageBuffer = await sharp(imageBuffer)
    .flatten()
    .resize({ width: width, height: height }) // Adjust the dimensions as needed
    .toBuffer();
  
    let filee = `public/${Date.now()}.png`
    let fileName = `${Date.now()}.png`
  
    const compositeImagePath = path.join("public", `image_${Date.now()}.png`);
  const compositeImageBuffer =
   await sharp(resizedImageBuffer)
    .composite([
      {
        input: svgBuffer,
        gravity: 'southeast',
        offset: {
          left: 100,
          bottom: 100,
        },
      },
    ])
    .toFile(filee);
  
    // console.log({filee})
    const data = fs.createReadStream(filee);
    console.log({data})
  
    console.log({compositeImageBuffer})
  
    let images= {
         type: metadata.format,
         name: fileName
    }
  
    
  
    if(data){
      evidenceIma = await uploadWaterMark(data, images);
     }


     console.log({evidencePictures})
     console.log({evidenceIma})



    })




  }

if(liveImage){


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
        font-size: 50px;
        font-weight: bold;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.7); /* Background color with 70% opacity */
        color: white; /* Text color */
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: 5px;
        width:100%;
        height: 100vh;
       }
      </style>

    
      <text  x="100%" y="100%" dy="-180px" dx="-40px" fill="white" font-size="50px" font-family="Arial, sans-serif" text-anchor="end" dominant-baseline="hanging" class="title">
      Location: ${geoLocation}
      </text>
      <text x="100%" y="100%"  dy="-50%" dx="-40px" fill="white" font-size="50px" font-family="Arial, sans-serif" text-anchor="end" dominant-baseline="hanging" class="title">
      Date: ${moment().format('llll')}
      </text>

    </svg>
`;

const imageBuffer = await got(liveImageCloud).buffer();

console.log({imageBuffer})


// Use sharp to get image metadata (width and height)
const metadata = await sharp(imageBuffer).metadata();

console.log({metadata})

// Access the width and height
const width = metadata.width < 800 ? metadata.width * 10 : metadata.width;
const height = metadata.height < 800 ? metadata.height * 10 : metadata.height;

console.log('Width:', width);
console.log('Height:', height);
const svgBuffer = Buffer.from(svgImage);

const resizedImageBuffer = await sharp(imageBuffer)
  .flatten()
  .resize({ width: width, height: height }) // Adjust the dimensions as needed
  .toBuffer();

  let filee = `public/${Date.now()}.png`
  let fileName = `${Date.now()}.png`

  const compositeImagePath = path.join("public", `image_${Date.now()}.png`);
const compositeImageBuffer =
 await sharp(resizedImageBuffer)
  .composite([
    {
      input: svgBuffer,
      gravity: 'southeast',
      offset: {
        left: 100,
        bottom: 100,
      },
    },
  ])
  .toFile(filee);

  // console.log({filee})
  const data = fs.createReadStream(filee);
  console.log({data})

  console.log({compositeImageBuffer})

  let images= {
       type: metadata.format,
       name: fileName
  }

  

  if(data){
    geoImage = await uploadWaterMark(data, images);
   }

   console.log({res})
   let user = new User({
       title,
       firstName,
       lastName,
       phoneNumber,
       email,
       lasaraaNumber,
       typeOfPollution,
       typeOfOrganizationCausingPollution,
       sourceOfPollution,
       addressOfThePollution,
       lga,
       briefDescriptionOfNoiseComplaint,
       entries,
       previousComplaintNumber,
       evidencePictures: imageCloud,
       evidenceVideo: videoCloud,
       evidenceAudio: audioCloud,
       evidenceDocumentsAndPDFs: documentsCloud,
       liveImage: liveImageCloud,
       liveVideo: liveVideoCloud,
       liveAudio: liveAudioCloud,
       maxDecibel,
       howDidYouHearAboutLasepa,
       additionalComments,
       geoLocation,
       complaintNumber
   });

   console.log(user)
   await user.save().then(async (profile) => {


       let data = `<div>
       <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
       Hi ${firstName},
       </p> 

       <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
       Thank you for taking the initiative to report environmental pollution in Lagos State. Your feedback is crucial in our efforts to maintain a healthy and sustainable environment.
       <br> <br>
       This email is to acknowledge the receipt of your complaint. We appreciate your commitment to creating a cleaner and safer community.
       <br> <br>
       Our team is currently reviewing the details you provided, and we will take the necessary steps to address the issue promptly. Please be assured that your concerns are important to us, and we will keep you informed of any developments in the resolution process.
       <br> <br>
       If you have any additional information or concerns, feel free to respond to this email.
       <br> <br>
       Thank you for being an active participant in environmental stewardship.
       <br> <br>
       Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}
       ComplaintNumber: ${complaintNumber}
       liveImage: ${geoImage ? `<a href="${geoImage}">click here</a><br>` : `No Captured Image`}<br>
       <br><br>
       </p>
       
       <div>`

      let resp = emailTemp(data, 'Complaint Acknowledgment - Environmental Pollution Report')


      const receivers = [
       {
         email: email
       }
     ]


     let data2 = `<div>
     <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
     Hi ${firstName},
     </p> 

     <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
    
       A new environmental pollution complaint has been lodged for Lagos State. Below are the details:
       <br>
       <br>
       *Complainant's Information:*<br>
       - Name: ${firstName} ${lastName} <br>
       - Email: ${email} <br>
       - Phone: ${phoneNumber} <br>
       <br> <br>
       *Complaint Details:*
      <br>
  
<br>
       Title : ${title} <br>
       <strong>First Name:</strong> ${firstName} <br>
       <strong>Last Name: </strong> ${lastName} <br>
       <strong>Phone Number: </strong> ${phoneNumber}<br>
       <strong>Email: </strong> ${email}<br>
       <strong>Lasrra Number:</strong>  ${lasaraaNumber}<br>
       <strong>Type of Pollution:</strong>  ${typeOfPollution}<br>
       <strong>Type of Organization Causing Pollution:</strong>  ${typeOfOrganizationCausingPollution}<br>
       <strong>Source of Pollution:</strong>  ${sourceOfPollution}<br>
       <strong>Address of the Pollution:</strong>  ${addressOfThePollution}<br>
       <strong>LGA: </strong> ${lga}<br>
       <strong>Brief Description of Noise Complaint: </strong> ${briefDescriptionOfNoiseComplaint}<br>
       <strong>Entries: </strong> ${entries}<br>
       <strong>Previous Complaint Number:</strong> ${previousComplaintNumber}<br>
       <strong>Additional Comments:</strong>  ${additionalComments}<br>
       <strong>Timestamp :</strong>  ${moment().format('MMMM Do YYYY, h:mm:ss a')}<br>
       <strong>imageTimestamp:</strong>  ${geoLocation}<br>
      
       
       <strong>Audio:</strong>   ${audioCloud ? `<a href="${audioCloud}">click here</a><br>` : `No Audio`}<br>
       <br>
       <br>
       <strong style="text-decoration: underline">Video Files</strong>
       <div>
       <strong>liveVideoCloud:</strong>  ${liveVideoCloud ? `<a href="${liveVideoCloud}">click here</a><br>` : `No Live Video`}<br>
       <strong>video:</strong>  ${videoCloud ? `<a href="${videoCloud}">click here</a><br>` : `No Video`}<br> 
       <strong>maxDecibelVideo:</strong>  ${videoCloud || liveVideoCloud ? Number(maxDecibel) + 9 : `No Video`}<br>
       </div>
       <br>
       <br>

       <br>
       <br>
       <strong style="text-decoration: underline">Audio Files</strong>
       <div>
       <strong>liveAudioCloud:</strong>   ${liveAudioCloud ? `<a href="${liveAudioCloud}">click here</a><br>` : `No Live Audio`}<br>
       <strong>image:</strong>  ${evidenceIma ? `<a href="${evidenceIma}">click here</a><br>` : `No Image`}<br> 
       <strong>maxDecibelAudio:</strong>  ${maxDecibel}<br>
       </div>
        <br>
       <br>
       <strong>liveImage:</strong>  ${geoImage ? `<a href="${geoImage}">click here</a><br>` : `No Captured Image`}<br>
       
       <strong>ComplaintNumber:</strong>  ${complaintNumber} <br>
       <br>
       Please take appropriate action to investigate and address the reported issue. If additional information is required, consider reaching out to the complainant for clarification.
       <br>
       Thank you for your prompt attention to this matter.
       <br> <br>   
     <br><br>
     </p>
     
     <div>`
     
    let resp2 = emailTemp(data2, 'Complaints tracker   : New Submission')


    const receivers2 = [
     {
       email: 'tolu.ajuwon@aceall.io'
      //  email: 'jolaoluwa@gmail.com'

     }
   ]

       await sendEmail(req, res, email, receivers, 'Complaint Acknowledgment', resp);
       await sendEmail(req, res, email, receivers2, 'Complaints tracker : New Submission', resp2);



       res.status(200).json({
           status: 200,
           success: true,
           data: profile
       })
   })
   return


})
} else{



  // if(data){
  //   geoImage = await uploadWaterMark(data, images);
  //  }

   console.log({res})
   let user = new User({
       title,
       firstName,
       lastName,
       phoneNumber,
       email,
       lasaraaNumber,
       typeOfPollution,
       typeOfOrganizationCausingPollution,
       sourceOfPollution,
       addressOfThePollution,
       lga,
       briefDescriptionOfNoiseComplaint,
       entries,
       previousComplaintNumber,
       evidencePictures: imageCloud,
       evidenceVideo: videoCloud,
       evidenceAudio: audioCloud,
       evidenceDocumentsAndPDFs: documentsCloud,
       liveImage: liveImageCloud,
       liveVideo: liveVideoCloud,
       liveAudio: liveAudioCloud,
       maxDecibel,
       howDidYouHearAboutLasepa,
       additionalComments,
       geoLocation,
       complaintNumber
   });

   console.log(user)
   await user.save().then(async (profile) => {


       let data = `<div>
       <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
       Hi ${firstName},
       </p> 

       <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
       Thank you for taking the initiative to report environmental pollution in Lagos State. Your feedback is crucial in our efforts to maintain a healthy and sustainable environment.
       <br> <br>
       This email is to acknowledge the receipt of your complaint. We appreciate your commitment to creating a cleaner and safer community.
       <br> <br>
       Our team is currently reviewing the details you provided, and we will take the necessary steps to address the issue promptly. Please be assured that your concerns are important to us, and we will keep you informed of any developments in the resolution process.
       <br> <br>
       If you have any additional information or concerns, feel free to respond to this email.
       <br> <br>
       Thank you for being an active participant in environmental stewardship.
       <br> <br>
       Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}
       ComplaintNumber: ${complaintNumber}
       liveImage: ${geoImage ? `<a href="${geoImage}">click here</a><br>` : `No Captured Image`}<br>
       <br><br>
       </p>
       
       <div>`

      let resp = emailTemp(data, 'Complaint Acknowledgment - Environmental Pollution Report')


      const receivers = [   
       {
         email: email
       }
     ]


     let data2 = `<div>
     <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
     Hi ${firstName},
     </p> 

     <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
    
       A new environmental pollution complaint has been lodged for Lagos State. Below are the details:
       <br>
       <br>
       *Complainant's Information:*<br>
       - Name: ${firstName} ${lastName} <br>
       - Email: ${email} <br>
       - Phone: ${phoneNumber} <br>
       <br> <br>
       *Complaint Details:*
      <br>
  
<br>
       Title : ${title} <br>
       <strong>First Name:</strong> ${firstName} <br>
       <strong>Last Name: </strong> ${lastName} <br>
       <strong>Phone Number: </strong> ${phoneNumber}<br>
       <strong>Email: </strong> ${email}<br>
       <strong>Lasrra Number:</strong>  ${lasaraaNumber}<br>
       <strong>Type of Pollution:</strong>  ${typeOfPollution}<br>
       <strong>Type of Organization Causing Pollution:</strong>  ${typeOfOrganizationCausingPollution}<br>
       <strong>Source of Pollution:</strong>  ${sourceOfPollution}<br>
       <strong>Address of the Pollution:</strong>  ${addressOfThePollution}<br>
       <strong>LGA: </strong> ${lga}<br>
       <strong>Brief Description of Noise Complaint: </strong> ${briefDescriptionOfNoiseComplaint}<br>
       <strong>Entries: </strong> ${entries}<br>
       <strong>Previous Complaint Number:</strong> ${previousComplaintNumber}<br>
       <strong>Additional Comments:</strong>  ${additionalComments}<br>
       <strong>Timestamp :</strong>  ${moment().format('MMMM Do YYYY, h:mm:ss a')}<br>
       <strong>imageTimestamp:</strong>  ${geoLocation}<br>
      
       
       <strong>Audio:</strong>   ${audioCloud ? `<a href="${audioCloud}">click here</a><br>` : `No Audio`}<br>
       <br>
       <br>
       <strong style="text-decoration: underline">Video Files</strong>
       <div>
       <strong>liveVideoCloud:</strong>  ${liveVideoCloud ? `<a href="${liveVideoCloud}">click here</a><br>` : `No Live Video`}<br>
       <strong>video:</strong>  ${videoCloud ? `<a href="${videoCloud}">click here</a><br>` : `No Video`}<br> 
       <strong>maxDecibelVideo:</strong>  ${videoCloud || liveVideoCloud ? Number(maxDecibel) + 9 : `No Video`}<br>
       </div>
       <br>
       <br>

       <br>
       <br>
       <strong style="text-decoration: underline">Audio Files</strong>
       <div>
       <strong>liveAudioCloud:</strong>   ${liveAudioCloud ? `<a href="${liveAudioCloud}">click here</a><br>` : `No Live Audio`}<br>
       <strong>image:</strong>  ${evidenceIma ? `<a href="${evidenceIma}">click here</a><br>` : `No Image`}<br> 
       <strong>maxDecibelAudio:</strong>  ${maxDecibel}<br>
       </div>
        <br>
       <br>
       <strong>liveImage:</strong>  ${geoImage ? `<a href="${geoImage}">click here</a><br>` : `No Captured Image`}<br>
       
       <strong>ComplaintNumber:</strong>  ${complaintNumber} <br>
       <br>
       Please take appropriate action to investigate and address the reported issue. If additional information is required, consider reaching out to the complainant for clarification.
       <br>
       Thank you for your prompt attention to this matter.
       <br> <br>   
     <br><br>
     </p>
     
     <div>`
     
    let resp2 = emailTemp(data2, 'Complaints tracker   : New Submission')


    const receivers2 = [
     {
      //  email: 'jolaoluwa@gmail.com'
       email: 'tolu.ajuwon@aceall.io'

     }
   ]

       await sendEmail(req, res, email, receivers, 'Complaint Acknowledgment', resp);
       await sendEmail(req, res, email, receivers2, 'Complaints tracker : New Submission', resp2);



       res.status(200).json({
           status: 200,
           success: true,
           data: profile
       })
   })
   return


  }


} catch (error) {
  console.log(error)
    // res.status(500).json({
    //     status: 500,
    //     success: false,
    //     error: error
    // })
}
//     try {

//         const formData = req.fields;

//         const {
//             title,
//             firstName,
//             lastName,
//             phoneNumber,
//             email,
//             lasaraaNumber,
//             typeOfPollution,
//             typeOfOrganizationCausingPollution,
//             sourceOfPollution,
//             addressOfThePollution,
//             lga,
//             briefDescriptionOfNoiseComplaint,
//             entries,
//             previousComplaintNumber,   
//             howDidYouHearAboutLasepa,
//             maxDecibel,
//             additionalComments,
//             geoLocation

//         } = req.fields;
        

//         const { 
//           evidenceDocumentsAndPDFs,
//           evidenceAudio,
//           evidenceVideo,
//           evidencePictures,
//           liveVideo,
//           liveAudio,
//           liveImage
//          } = req.files;


//          let imageCloud;
//          let audioCloud;
//          let videoCloud;
//          let documentsCloud;
//          let liveImageCloud;
//          let liveVideoCloud;
//          let liveAudioCloud;

//         //  console.log(req.files)

//          if(evidencePictures){
//           imageCloud = await uploadFiles(evidencePictures);
//           // console.log({imageCloud})
//          }

//          if(evidenceVideo){
//            videoCloud = await uploadFiles(evidenceVideo);

//          }
        
//         if(evidenceAudio){
//           audioCloud = await uploadFiles(evidenceAudio);
//           // console.log({audioCloud})
//          }
      
//          if(evidenceDocumentsAndPDFs){
//           documentsCloud = await uploadFiles(evidenceDocumentsAndPDFs);
//           // console.log({documentsCloud})
//          }

//          if(liveImage){

//         liveImageCloud = await uploadFiles(liveImage);
//         // console.log({liveImageCloud})
//          }

//          if(liveVideo){
//           liveVideoCloud = await uploadFiles(liveVideo);
//           // console.log({liveVideoCloud})
//          }

//         if(liveAudio){
//           liveAudioCloud = await uploadFiles(liveAudio);
//           // console.log({liveAudioCloud})
//         }
       

//         let complaintNumber = String(Date.now())

        
//            let user = new User({
//                 title,
//                 firstName,
//                 lastName,
//                 phoneNumber,
//                 email,
//                 lasaraaNumber,
//                 typeOfPollution,
//                 typeOfOrganizationCausingPollution,
//                 sourceOfPollution,
//                 addressOfThePollution,
//                 lga,
//                 briefDescriptionOfNoiseComplaint,
//                 entries,
//                 previousComplaintNumber,
//                 evidencePictures: imageCloud,
//                 evidenceVideo: videoCloud,
//                 evidenceAudio: audioCloud,
//                 evidenceDocumentsAndPDFs: documentsCloud,
//                 liveImage: liveImageCloud,
//                 liveVideo: liveVideoCloud,
//                 liveAudio: liveAudioCloud,
//                 maxDecibel,
//                 howDidYouHearAboutLasepa,
//                 additionalComments,
//                 geoLocation,
//                 complaintNumber
//             });

//             console.log(user)
//             await user.save().then(async (profile) => {

        
//                 let data = `<div>
//                 <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
//                 Hi ${firstName},
//                 </p> 
        
//                 <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
//                 Thank you for taking the initiative to report environmental pollution in Lagos State. Your feedback is crucial in our efforts to maintain a healthy and sustainable environment.
//                 <br> <br>
//                 This email is to acknowledge the receipt of your complaint. We appreciate your commitment to creating a cleaner and safer community.
//                 <br> <br>
//                 Our team is currently reviewing the details you provided, and we will take the necessary steps to address the issue promptly. Please be assured that your concerns are important to us, and we will keep you informed of any developments in the resolution process.
//                 <br> <br>
//                 If you have any additional information or concerns, feel free to respond to this email.
//                 <br> <br>
//                 Thank you for being an active participant in environmental stewardship.
//                 <br> <br>
//                 Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}
//                 ComplaintNumber: ${complaintNumber}
//                 <br><br>
//                 </p>
                
//                 <div>`
        
//                let resp = emailTemp(data, 'Complaint Acknowledgment - Environmental Pollution Report')
    
    
//                const receivers = [
//                 {
//                   email: email
//                 }
//               ]


//               let data2 = `<div>
//               <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
//               Hi ${firstName},
//               </p> 
      
//               <p style="font-size: 16px; text-align: left !important; font-weight: 300;">
             
//                 A new environmental pollution complaint has been lodged for Lagos State. Below are the details:
//                 <br>
//                 <br>
//                 *Complainant's Information:*<br>
//                 - Name: ${firstName} ${lastName} <br>
//                 - Email: ${email} <br>
//                 - Phone: ${phoneNumber} <br>
//                 <br> <br>
//                 *Complaint Details:*
//                <br>
           
// <br>
//                 Title : ${title} <br>
//                 First Name: ${firstName} <br>
//                 Last Name: ${lastName} <br>
//                 Phone Number: ${phoneNumber}<br>
//                 Email: ${email}<br>
//                 Lasrra Number: ${lasaraaNumber}<br>
//                 Type of Pollution: ${typeOfPollution}<br>
//                 Type of Organization Causing Pollution: ${typeOfOrganizationCausingPollution}<br>
//                 Source of Pollution: ${sourceOfPollution}<br>
//                 Address of the Pollution: ${addressOfThePollution}<br>
//                 LGA: ${lga}<br>
//                 Brief Description of Noise Complaint: ${briefDescriptionOfNoiseComplaint}<br>
//                 Entries: ${entries}<br>
//                 Previous Complaint Number:${previousComplaintNumber}<br>
//                 Additional Comments: ${additionalComments}<br>
//                 Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}<br>
//                 imageTimestamp: ${geoLocation}<br>
//                 maxDecibel: ${maxDecibel}<br>
//                 image: ${imageCloud ? `<a href="${imageCloud}">click here</a><br>` : `No Image`}<br> 
//                 audio:  ${audioCloud ? `<a href="${audioCloud}">click here</a><br>` : `No Audio`}<br>
//                 video: ${videoCloud ? `<a href="${videoCloud}">click here</a><br>` : `No Video`}<br> 
//                 liveImage: ${liveImageCloud ? `<a href="${liveImageCloud}">click here</a><br>` : `No Captured Image`}<br>
//                 liveVideoCloud: ${liveVideoCloud ? `<a href="${liveVideoCloud}">click here</a><br>` : `No Live Video`}<br>
//                 liveAudioCloud:  ${liveAudioCloud ? `<a href="${liveAudioCloud}">click here</a><br>` : `No Live Audio`}<br>
//                 ComplaintNumber: ${complaintNumber} <br>
//                 <br>
//                 Please take appropriate action to investigate and address the reported issue. If additional information is required, consider reaching out to the complainant for clarification.
//                 <br>
//                 Thank you for your prompt attention to this matter.
//                 <br> <br>   
//               <br><br>
//               </p>
              
//               <div>`
              
//              let resp2 = emailTemp(data2, 'Complaints tracker   : New Submission')
  
  
//              const receivers2 = [
//               {
//                 email: 'jolaoluwa@gmail.com'
//               }
//             ]
        
//                 await sendEmail(req, res, email, receivers, 'Complaint Acknowledgment', resp);
//                 await sendEmail(req, res, email, receivers2, 'Complaints tracker : New Submission', resp2);



//                 res.status(200).json({
//                     status: 200,
//                     success: true,
//                     data: profile
//                 })
//             })
//             return
      

//     } catch (error) {
//       console.log(error)
//         // res.status(500).json({
//         //     status: 500,
//         //     success: false,
//         //     error: error
//         // })
//     }
}
export default useComplaint;