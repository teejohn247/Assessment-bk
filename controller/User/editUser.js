
import dotenv from 'dotenv';
import User from '../../model/User';
// import Permissions from '../../model/Permissions';




dotenv.config();


const editUser = async (req, res) => {

    try {



        const { firstName, lastName, approve} = req.body;


        const user = await User.findOne({_id: req.params.id})

        console.log(user)

        if (user.length < 1) {
            res.status(400).json({
                status: 400,
                error: 'Role does not exist'
            })
            return;
        }


        await user.updateOne({

            firstName: firstName && firstName,
            lastName: lastName && lastName,
            approved: approve && approve


        
        });

        console.log('jjh')

        await user.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: "Role updated"
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default editUser;
