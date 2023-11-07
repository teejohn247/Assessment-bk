
import dotenv from 'dotenv';
import Admin from '../../model/Cell';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';
import Zone from '../../model/Zones';

dotenv.config();


const createCell = async (req, res) => {

    try {
        // cell_leader_name: { type: String,  trim: true },
        // cell_asst_name: { type: String,  trim: true },
        // cell_leader_phone: { type: String,  trim: true },
        // cell_asst_phone: { type: String,  trim: true },
        // zone: { type: String,  trim: true },
        // zoneName: { type: String,  trim: true },
        // coverage_area: { type: String,  trim: true },
        const { cell_leader_name, cell_asst_name, cell_leader_phone, cell_asst_phone, zone, coverage_area } = req.body;

        let zones = await Zone.findOne({ _id: zone });
    

       let superAdmin = new Admin({
            cell_leader_name, 
            cell_asst_name, 
            cell_leader_phone, 
            cell_asst_phone, 
            zone, 
            zone_name: zones.zone_name,
            coverage_area 
        });

        await superAdmin.save();



        res.status(201).json({
            status: 201,
            success: true,
            data: superAdmin
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createCell;
