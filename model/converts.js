import mongoose from 'mongoose';

const ConvertsSchema = new mongoose.Schema({
    name: { type: String,  trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true},
    date_of_new_convert: { type: Date},
    cell: { type: String},
    cellName: { type: String},
    zone: { type: String},
    zoneName: { type: String},
}, { timestamps: true }); 

module.exports = mongoose.model("Converts", ConvertsSchema);