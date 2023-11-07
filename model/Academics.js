import mongoose from 'mongoose';


const AcademicsSchema = new mongoose.Schema({
    session: {
        create_academic_year: {
            type: Boolean,
            default: false
        },
        create_terms: {
            type: Boolean,
            default: false
        }
    },
    class: {
        create_nursery_classes: {
            type: Boolean,
            default: false
        },
        create_primary_classes: {
            type: Boolean,
            default: false
        },
        create_secondary_classes: {
            type: Boolean,
            default: false
        }
    },
    assigned_to:  [{
        school_id: {
            type: String,
        },
        school_name: {
            type: String
        },
        date_assigned: {
            type: Date,
            default: Date.now()
        }
    }],
    created_by: {type: String, required: true},
}, { timestamps: true })


module.exports = mongoose.model("Academics", AcademicsSchema);