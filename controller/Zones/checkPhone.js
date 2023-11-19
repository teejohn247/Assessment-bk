
import dotenv from 'dotenv';
import Admin from '../../model/converts';
import Cell from '../../model/Cell';
import Zone from '../../model/Zones';
import FirstTimers from '../../model/FirstTimers';
import SecondTimers from '../../model/SecondTimers';




dotenv.config();

const checkPhone = async (req, res) => {

    try {

        const { phone } = req.body;

        let zones = await FirstTimers.findOne({ phone });
        let cells = await SecondTimers.findOne({ phone });
 
        if (zones) {

            // firstTimers
         
            let superAdmin = new Admin({
                name: zones.name, 
                address: zones.address,
                email: zones.email, 
                gender: zones.gender, 
                phone:zones.phone,
                cell: zones.cell, 
                cell_name: zones.cell_name, 
                zone: zones.zone,
                zone_name: zones.zone_name
            });

            await superAdmin.save();

            res.status(201).json({
                status: 201,
                success: true,
                data: superAdmin
            })
        } else if(!zones && !cells){

            // firstTimers
                    
            let superAdmin = new Admin({
                name: zones.name, 
                address: zones.address,
                email: zones.email, 
                gender: zones.gender, 
                phone:zones.phone,
                cell: zones.cell, 
                cell_name: zones.cell_name, 
                zone: zones.zone,
                zone_name: zones.zone_name
            });

            await superAdmin.save();

            res.status(201).json({
                status: 201,
                success: true,
                data: superAdmin
            })


        }

        
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default checkPhone;
