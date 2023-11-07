import mongoose from 'mongoose';

const CellSchema = new mongoose.Schema({
    cell_leader_name: { type: String,  trim: true },
    cell_asst_name: { type: String,  trim: true },
    cell_leader_phone: { type: String,  trim: true },
    cell_asst_phone: { type: String,  trim: true },
    zone: { type: String,  trim: true },
    zone_name: { type: String,  trim: true },
    coverage_area: { type: String,  trim: true },
}, { timestamps: true }); 

module.exports = mongoose.model("Cell", CellSchema);