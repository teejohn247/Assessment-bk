
import dotenv from 'dotenv';
import Admin from '../../model/Zones'
import Cell from '../../model/Cell'


dotenv.config();


const updateCell = async (req, res) => {

    try {
        const { cell_leader_name, cell_asst_name, cell_leader_phone, cell_asst_phone, zone, coverage_area  } = req.body;

        let admin = await Admin.findOne({ _id: zone});

        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Zone not found'
            })
            return;
        }

        let cell = await Cell.findOne({ _id: req.params.id});

        if (!cell) {
            res.status(400).json({
                status: 400,
                error: 'Cell not found'
            })
            return;
        }
        await cell.updateOne({

            cell_leader_name: cell_leader_name && cell_leader_name, 
            cell_asst_name: cell_asst_name && cell_asst_name, 
            cell_leader_phone:  cell_leader_phone &&  cell_leader_phone, 
            cell_asst_phone: cell_asst_phone && cell_asst_phone, 
            zone: zone && zone, 
            zone_name: admin && admin.zone_name, 
            coverage_area:coverage_area && coverage_area
        
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
export default updateCell;
