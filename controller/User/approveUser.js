
import dotenv from 'dotenv';
import User from '../../model/User';


dotenv.config();


const approveUser = async (req, res) => {

    try {


        let user= await User.findOne({ _id: req.params.id });

        if (!user) {
            res.status(400).json({
                status: 400,
                error: 'User does not exist'
            })
            return;
        }

        if(user.admin !== req.payload.id){
            res.status(400).json({
                status: 400,
                error: 'Access denied.'
            })
            return;
        }
    
        await user.updateOne({
            approved: true,
            admin: req.payload.id,
            isAdmin: true
        });

        res.status(201).json({
            status: 201,
            success: true,
            data: "User Approval Successful",
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default approveUser;
