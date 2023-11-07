import mongoose from 'mongoose';

const SecondTimersSchema = new mongoose.Schema({
    name: { type: String,  trim: true },
    address: { type: String, trim: true },
    email: { type: String, trim: true},
    phone: { type: String, trim: true},
    category: { type: Array },
    date_of_second_visit: { type: Date, default: Date.now()},
    cell: { type: String},
    cell_name: { type: String},
    zone: { type: String},
    zone_name: { type: String},
    attendanceNumber: { type: Number, default: 2},
}, { timestamps: true }); 

module.exports = mongoose.model("SecondTimers", SecondTimersSchema);