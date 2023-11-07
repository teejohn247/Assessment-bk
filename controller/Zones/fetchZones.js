
import dotenv from 'dotenv';
import Zone from '../../model/Zones';

dotenv.config();


const fetchZones = async (req, res) => {

    try {

        console.log('here')

        const { page, limit } = req.query;

        let admin = await Zone.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        console.log(admin)


        const count = await  Zone.find().countDocuments()


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
export default fetchZones;
