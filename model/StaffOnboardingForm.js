import mongoose from 'mongoose';

const StaffOnboardingFormsSchema = new mongoose.Schema({
    form_name: {type: String, required: true},
    form_fields: 
        [{
            field_title: {
                type: String,
            },
            input_type: {
                type: String
            },
            _id:{
                type: String
            }
        }],
        assigned_to:  [{
            school_id: {
                type: String,
            },
            school_name: {
                type: String
            },
            date_assigned: {
                type: Date
            }
        }],
    created_by: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })


module.exports = mongoose.model("StaffOnboardingForms", StaffOnboardingFormsSchema);


