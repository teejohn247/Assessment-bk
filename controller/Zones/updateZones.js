
import dotenv from 'dotenv';
import Admin from '../../model/Zones'

dotenv.config();


const updateZones = async (req, res) => {

    try {
        const { zone_name, zonal_cordinator_name, zonal_cordinator_phone } = req.body;

        let admin = await Admin.findOne({ _id: req.params.id});

        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Zone not found'
            })
            return;
        }
        await admin.updateOne({

            zone_name: zone_name && zone_name, 
            zonal_cordinator_name: zonal_cordinator_name && zonal_cordinator_name, 
            zonal_cordinator_phone: zonal_cordinator_phone && zonal_cordinator_phone
        
        });
        res.status(201).json({
            status: 201,
            success: true,
            data: "Update Successful"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default updateZones;
