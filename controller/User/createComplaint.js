
import dotenv from 'dotenv';
import User from '../../model/Lasepa';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../config/email';
import cloudinary from '../../config/cloudinary';
import { emailTemp } from '../../emailTemplate';
import moment from 'moment';
import csvDownload from 'json-to-csv-export'

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
            additionalComments,
            evidenceVideo,
            evidenceAudio,
            evidenceDocumentsAndPDFs
        } = req.fields;

        const { 
          evidencePictures,
         }= req.files;
        // console.log(req.files)

        // const scv = [req.fields]

        // console.log({scv})

        
        const imageCloud = await cloudinary.uploader.upload(evidencePictures.path, {resource_type: "image"});
        // const videoCloud = await cloudinary.uploader.upload(evidenceVideo.path, {resource_type: "raw"}); 
        // const audioCloud = await cloudinary.uploader.upload(evidenceAudio.path, {resource_type: "auto"});
        // const documentsCloud = await cloudinary.uploader.upload(evidenceDocumentsAndPDFs.path, {resource_type: "raw"});
       
          
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
                evidencePictures: imageCloud.secure_url,
                evidenceVideo,
                evidenceAudio,
                evidenceDocumentsAndPDFs,
                howDidYouHearAboutLasepa,
                additionalComments,
            });

            res.send(user)
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
                Evidence Documents: ${evidenceDocumentsAndPDFs}<br>
                Additional Comments: ${additionalComments}<br>
                Timestamp : ${moment().format('MMMM Do YYYY, h:mm:ss a')}
              
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