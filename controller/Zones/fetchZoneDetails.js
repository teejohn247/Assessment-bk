
import dotenv from 'dotenv';
import Admin from '../../model/Zones';

dotenv.config();


const fetchZonesDetails = async (req, res) => {

    try {
        let admin = await Admin.find({_id: req.params.id})
        res.status(201).json({
            status: 201,
            success: true,
            data: admin,
          
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default fetchZonesDetails;
