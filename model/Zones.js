import mongoose from 'mongoose';

const ZoneSchema = new mongoose.Schema({
    zone_name: { type: String,  trim: true },
    zonal_cordinator_name: { type: String,  trim: true },
    zonal_cordinator_phone: { type: String,  trim: true },
}, { timestamps: true }); 

module.exports = mongoose.model("Zone", ZoneSchema);
module.exports = mongoose.model("Zone", ZoneSchema);