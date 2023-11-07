
import dotenv from 'dotenv';
import Admin from '../../model/SecondTimers';
import Cell from '../../model/Cell';
import Zone from '../../model/Zones';


dotenv.config();


const createSecondTimers = async (req, res) => {

    try {

        const { name, address, email, gender, phone, cell, zone } = req.body;

        let zones = await Zone.findOne({ _id: zone });
        let cells = await Cell.findOne({ _id: cell });


        let first = await Admin.findOne({ email });



        if (first) {
            res.status(400).json({
                status: 400,
                error: 'Email already exist'
            })
            return;
        }
 
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


       let superAdmin = new Admin({
            name, 
            address,
            email, 
            gender, 
            phone,
            cell, 
            cell_name: cells.cell_leader_name, 
            zone,
            zone_name: zones.zone_name
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
export default createSecondTimers;
