import mongoose from 'mongoose';

const StaffOnboardingDataSchema = new mongoose.Schema({
    form_id: {type: String, required: true},
    form_name: {type: String, required: true},
    form_fields: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true
    },
    answered_by: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })


module.exports = mongoose.model("StaffOnboardingData", StaffOnboardingDataSchema);