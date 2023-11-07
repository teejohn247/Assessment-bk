
import dotenv from 'dotenv';
import Admin from '../../model/Zones';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';

dotenv.config();


const createZone = async (req, res) => {

    try {

        const { zone_name, zonal_cordinator_name, zonal_cordinator_phone} = req.body;

        let superAdmin = await Admin.findOne({ zone_name });


        if (superAdmin) {
            res.status(400).json({
                status: 400,
                error: 'This zone name already exist'
            })
            return;
        }

        if (!zonal_cordinator_name) {
            res.status(400).json({
                status: 400,
                error: 'zonal_cordinator_name is required'
            })
            return;
        }

        superAdmin = new Admin({
            zonal_cordinator_name,
            zonal_cordinator_phone,
            zone_name
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
export default createZone;
