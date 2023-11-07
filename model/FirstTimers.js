import mongoose from 'mongoose';

const FirstTimersSchema = new mongoose.Schema({
    name: { type: String,  trim: true },
    address: { type: String, trim: true },
    email: { type: String, trim: true},
    age_range: { type: String },
    bad_comment: { type: String },
    category: { type: Array },
    age_range: { type: String },
    date_of_first_visit: { type: Date, default: Date.now()},
    education_level: { type: String},
    gender: { type: String},
    phone: { type: String},
    prayer_request: { type: String},
    date_of_birth: { type: String},
    cell: { type: String},
    cell_name: { type: String},
    date_of_first_visit:{ type: String},
    zone: { type: String},
    zone_name: { type: String},
    attendance: { type: Number, default: 1},
}, { timestamps: true }); 

module.exports = mongoose.model("FirstTimers", FirstTimersSchema);