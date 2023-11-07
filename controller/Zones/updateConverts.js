
import dotenv from 'dotenv';
import Admin from '../../model/converts';
import bcrypt from 'bcrypt';
import utils from '../../config/utils';
import Cell from '../../model/Cell';
import Zone from '../../model/Zones';

dotenv.config();


const updateConvert = async (req, res) => {

    try {
        const { name, address, date_of_new_convert, phone, cell, zone } = req.body;


        let admin = await Admin.findOne({ _id: req.params.id});

        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Convert not found'
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
            phone: phone && phone, 
            cell: cell && cell, 
            zone: zone && zone,
            cell_name: cell && cells.zone_name, 
            zone_name: zone && zones.zone_name,
            date_of_new_convert: date_of_new_convert && date_of_new_convert
        
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
export default updateConvert;
