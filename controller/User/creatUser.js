
import dotenv from 'dotenv';
import userModel from '../../model/User';
import bcrypt from 'bcryptjs';
import { emailTemp } from '../../emailTemplate'
import {sendEmail} from '../../config/email';


dotenv.config(); 

const createUser = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            role
        } = req.fields;

        
        const findUser = await userModel.findOne({email: email})
        if(findUser){
            res.status(400).json({
                status: 400,
                success: false,
                error: 'User already exist'
            })
            return;
        }

        const randomPassword = Math.random().toString(36).slice(-8);

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(randomPassword, salt);
        const password = hashedPass;

        const saveUser = new userModel({
            firstName,
            lastName,
            email,
            password,
            role
        })

        await saveUser.save().then(async(data) => {

            const emailTemplate = `
                Hi ${firstName},
                <br><br>
                <p>
                We're excited to welcome you to LASEPA as ${role}! Your account has been successfully created, and you're now part of our community.</p>
                <br>
                <b>Account Details:</b>
                <br>
                - Email:  ${email}
                <br>
                - Password: ${randomPassword}
                <br><br>
                <p>
                Feel free to log in and explore all the amazing features we have to offer. If you have any questions or need assistance, our support team is here to help.
                </p>
                <br>
                Thanks for joining us on this journey!
                <br>
            `
            let resp = emailTemp(emailTemplate, 'Your Account Has Been Successfully Created - Vital Details Enclosed')
            const receivers = [
                {
                  email: email
                }
              ]
              await sendEmail(email, receivers, 'Account Creation', resp);

            res.status(201).json({
                status: 201,
                success: true,
                data: data
            })
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}

export default createUser;