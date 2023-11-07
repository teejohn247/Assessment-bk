
import User from '../../model/User';



const deleteUser= async (req, res) => {

    try {


        let user = await User.findOne({ _id: req.params.id});


        if (!user) {
            res.status(400).json({
                status: 400,
                error: 'User not found'
            })
            return;
        }

        if(user.admin !== req.payload.id){
            res.status(400).json({
                status: 400,
                error: 'Access denied. You must be an admin to this user.'
            })
            return;
        }


        User.remove({ _id: req.params.id },
            function (
                err,
                result
            ) {
                console.log(result)

                if (err) {
                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        data: "User Deleted successfully!"
                    })
                }

            })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default deleteUser;

