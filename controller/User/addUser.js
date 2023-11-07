
import dotenv from 'dotenv';
import User from '../../model/User';
import bcrypt from 'bcrypt';
import { emailTemp } from '../../emailTemplate'
import {sendEmail} from '../../config/email';


dotenv.config();


const addUser = async (req, res) => {

    try {

        console.log('trr')

        const { firstName, email, lastName} = req.body;

        let user = await User.findOne({ email });
        let admin = await User.findOne({ _id: req.payload.id });


        console.log(req.payload)

        if(user){
            res.status(400).json({
                status: 400,
                success: false,
                msg: "Email address already exists"

            })
            return;
        }

        if(req.payload.approved == false){
            res.status(400).json({
                status: 400,
                success: false,
                msg: "Your account needs to be approved by your account admin"

            })
            return;
        }

        console.log('tolu')


        let password  = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
     
        for (let i = 1; i <= 8; i++) {
            let char = Math.floor(Math.random()
                * str.length + 1);
     
            password += str.charAt(char)
        }

        console.log(password)

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);


        console.log(salt)


        let data = `<div>
        <p style="padding: 32px 0; text-align: left !important; font-weight: 700; font-size: 20px;font-family: 'DM Sans';">
        Hi ${firstName},
        </p> 

        <p style="font-size: 16px; text-align: left !important; font-weight: 300;">

        You have been invited to join <a href="https://xped8-ca9291a9a7e0.herokuapp.com/set-password">Wakanow</a> 
        <br>
        Here are your login credentials

        email: ${email}
        password: ${password}

        <br><br>
        </p>
        
        <div>`
        console.log('user')

       let resp = emailTemp(data, 'Employee Invitation')

       console.log(resp)

       const receivers = [
        {
          email: email
        }
      ]

      await sendEmail(req, res, email, receivers, 'Employee Invitation', resp);

      user = new User({
        firstName,
        lastName,
        email: email,
        password: hashed,
        admin: `${admin.firstName} ${admin.lastName}`,
        adminId: req.payload.id
    });

    await user.save().then((profile) => {
        res.status(200).json({
            status: 200,
            success: true,
            data: profile
        })
    })
    return



    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default addUser;