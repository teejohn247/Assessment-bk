import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../../model/User';
import utils from '../../config/utils';

dotenv.config();

const login = async (req, res) => {

    try{ 
        const {email, password} = req.body;

        console.log({email})



        let user = await User.findOne({ email: email });
        console.log(user)
        if(!user){
            res.status(400).json({
                status: 400,
                success: false,
                error: "User doesn't exist"
            })
            return;
        }

        console.log(user)


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           res.status(404).json({
                status: 404,
                success: false,
               error: 'Invalid login credentials'
           })
           return;
        }
        const token = utils.encodeToken( user._id, user.approved, user.email);
        console.log(token)
        res.status(200).json({
            status: 200,
            success: true,
            data: user,
            token: token
        })
    }catch(error){
        res.status(500).json({
            status: 500,
            success: false,
            error:'server error'
        })
    }
}

export default login;