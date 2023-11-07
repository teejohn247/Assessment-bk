
import dotenv from 'dotenv';
import Admin from '../../model/SecondTimers';

dotenv.config();


const deleteSecondTimers = async (req, res) => {

    try {


        let admin = await Admin.findOne({ _id: req.params.id});


        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Admin not found'
            })
            return;
        }

        Admin.remove({ _id: req.params.id },
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
                        data: "Second timer deleted successfully!"
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
export default deleteSecondTimers;
