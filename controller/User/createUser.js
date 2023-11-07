
import dotenv from 'dotenv';
import User from '../../model/User';
import bcrypt from 'bcrypt';



dotenv.config();


const userRegister = async (req, res) => {

    try {


        const { firstName, email, password, lastName } = req.body;

        console.log(req.body)


        let user = await User.findOne({ email });

        console.log({user})
        let userCheck = await User.find();

        if(user){
            res.status(400).json({
                status: 400,
                success: false,
                msg: "Email address already exists"

            })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        console.log(hashed)

        if(userCheck.length < 1){
        console.log('hashed')
          
            user = new User({
                firstName,
                lastName,
                email: email,
                password: hashed,
                approved: true,
                isAdmin: true
            });
            await user.save().then((profile) => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: profile
                })
            })
            return
        }else{

            console.log('hashed2')
            user = new User({
                firstName,
                lastName,
                email: email,
                password: hashed
            });
    

            await user.save().then((profile) => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: profile
                })
            })
            return
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default userRegister;