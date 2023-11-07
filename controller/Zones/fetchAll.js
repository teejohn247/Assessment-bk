
import dotenv from 'dotenv';
import Admin from '../../model/FirstTimers';
import SecondTimers from '../../model/SecondTimers';
import Converts from '../../model/converts';


dotenv.config();


const fetchAll = async (req, res) => {

    try {

        const { page, limit } = req.query;

        let admin = await Admin.find()
        let second = await SecondTimers.find()
        let conv = await Converts.find()



        const count = await Admin.find().countDocuments()


        res.status(201).json({
            status: 201,
            success: true,
            firstTimers: admin,
            secondTimers:second,
            converts: conv,

        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default fetchAll;
