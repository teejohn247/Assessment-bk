
import dotenv from 'dotenv';
import Admin from '../../model/FirstTimers';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';
import Cell from '../../model/Cell';
import Zone from '../../model/Zones';

dotenv.config();


const updateFirstTimers = async (req, res) => {

    try {
        const { name, address, email, age_range, date_of_first_visit, bad_comment, category,  education_level, gender, phone, prayer_request, date_of_birth
            , cell, zone } = req.body;

        let admin = await Admin.findOne({ _id: req.params.id});

        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Zone not found'
            })
            return;
        }

        let zones = await Zone.findOne({ _id: zone });
        let cells = await Cell.findOne({ _id: cell });



 
        if (!zones) {
            res.status(400).json({
                status: 400,
                error: 'Zone does not exist'
            })
            return;
        }

        if (!cells) {
            res.status(400).json({
                status: 400,
                error: 'Cell does not exist'
            })
            return;
        }
        await admin.updateOne({

            name: name && name, 
            address: address && address, 
            email: email && email, 
            age_range: age_range && age_range, 
            bad_comment: bad_comment && bad_comment, 
            category: category && category,  
            education_level: education_level && education_level, 
            gender:gender && gender, 
            phone: phone && phone, 
            prayer_request: prayer_request && prayer_request, 
            date_of_birth: date_of_birth && date_of_birth,
            cell: cell && cell, 
            zone: zone && zone,
            cell_name: cell && cells.cell_leader_name, 
            zone_name: zone && zones.zone_name,
            date_of_first_visit: date_of_first_visit && date_of_first_visit

        
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
export default updateFirstTimers;
