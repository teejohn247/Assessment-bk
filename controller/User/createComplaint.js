
import dotenv from 'dotenv';
import User from '../../model/Lasepa';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../config/email';
import cloudinary from '../../config/cloudinary';
import { emailTemp } from '../../emailTemplate';
import moment from 'moment';
import csvDownload from 'json-to-csv-export'
import uploadFiles from '../../middleware/uploadImage';

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


         let imageCloud;
         let audioCloud;
         let videoCloud;
         let documentsCloud;
         let liveImageCloud;
         let liveVideoCloud;
         let liveAudioCloud;

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
                geoLocation
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
                First Name: ${firstName} <br>
                Last Name: ${lastName} <br>
                Phone Number: ${phoneNumber}<br>
                Email: ${email}<br>
                Lasrra Number: ${lasaraaNumber}<br>
                Type of Pollution: ${typeOfPollution}<br>
                Type of Organization Causing Pollution: ${typeOfOrganizationCausingPollution}<br>
                Source of Pollution: ${sourceOfPollution}<br>
                Address of the Pollution: ${addressOfThePollution}<br>
                LGA: ${lga}<br>
                Brief Description of Noise Complaint: ${briefDescriptionOfNoiseComplaint}<br>
                Entries: ${entries}<br>
                Previous Complaint Number:${previousComplaintNumber}<br>
                Additional Comments: ${additionalComments}<br>
                Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}<br>
                imageTimestamp: ${geoLocation}<br>
                maxDecibel: ${maxDecibel}<br>
                imageCloud: <a href="${imageCloud}">click here</a><br>
                audioCloud: <a href="${audioCloud}">click here</a><br>
                videoCloud: <a href="${videoCloud}">click here</a><br>
                Evidence Documents: <a href="${documentsCloud}">click here</a><br>
                liveImage: ${liveImageCloud ? `<a href="${liveImageCloud}">click here</a><br>` : `No Captured Image`}<br>
                liveVideoCloud: ${liveVideoCloud ? `<a href="${liveVideoCloud}">click here</a><br>` : `No Live Video`}<br>
                liveAudioCloud:  ${liveAudioCloud ? `<a href="${liveAudioCloud}">click here</a><br>` : `No Live Audio`}<br>
                <br>
                Please take appropriate action to investigate and address the reported issue. If additional information is required, consider reaching out to the complainant for clarification.
                <br>
                Thank you for your prompt attention to this matter.
                <br> <br>   
              <br><br>
              </p>
              
              <div>`
              
             let resp2 = emailTemp(data2, 'Complaint Acknowledgment - Environmental Pollution Report')
  
  
             const receivers2 = [
              {
                email: 'tolu.ajuwon@aceall.io'
              }
            ]
        
                await sendEmail(req, res, email, receivers, 'Complaint Acknowledgment', resp);
                await sendEmail(req, res, email, receivers2, 'Employee Invitation', resp2);



                res.status(200).json({
                    status: 200,
                    success: true,
                    data: profile
                })
            })
            return
      

    } catch (error) {
      console.log(error)
        // res.status(500).json({
        //     status: 500,
        //     success: false,
        //     error: error
        // })
    }
}
export default useComplaint;