import mongoose from 'mongoose';


const DataOnboardingSchema = new mongoose.Schema({
    template_name: {type: String, required: true},
    type: {type: String, required: true, default: "student"},
    files: [{
        file_name: {
            type: String,
        },
        file_path: {
            type: String
        }
    }],
    assigned_to: [{
        school_id: {
            type: String,
        },
        school_name: {
            type: String
        },
        school_logo: {
            type: String
        },
        date_assigned: {
            type: Date,
            default: Date.now()
        },
    }],
    bulk_upload: {type: Boolean, default: false},
    enabled:{
        type: Boolean, default: false
    },
    created_by: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })



module.exports = mongoose.model("DataOnboarding", DataOnboardingSchema);