
import dotenv from 'dotenv';
import Admin from '../../model/FirstTimers';

dotenv.config();


const fetchFirstTimers = async (req, res) => {

    try {

        const { page, limit } = req.query;

        let admin = await Admin.find().limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


        const count = await Admin.find().countDocuments()


        res.status(201).json({
            status: 201,
            success: true,
            data: admin,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default fetchFirstTimers;
