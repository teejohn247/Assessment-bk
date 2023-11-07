import mongoose from 'mongoose';

const SchoolOnboardingFormsSchema = new mongoose.Schema({
    form_name: { type: String, required: true },
    header:
    {
        form_fields: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true
        },
        logo: {
            type: String
        }
    },
    footer:
    {
        form_fields: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: true
        },
        logo: {
            type: String
        }
    },
    sections:
        [{
            section_name: {
                type: String,
            },
            section_description: {
                type: String,
            },
            form_fields: [
                {
                    field_title: {
                        type: String,
                    },
                    input_type: {
                        type: String
                    },
                    options:[{
                        field_title: {
                            type: String,
                        },
                        value: {
                            type: String,
                        },
                    }],
                    
                }
            ],
            textbox: 
                {
                    header: {
                        type: String,
                    },
                    text: {
                        type: String
                    }
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
            type: Date
        },
        module: {
            type: String,
            default: "student"
        },
    }],
    enabled: {
        type: Boolean, default: true
    },
    created_by: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })


module.exports = mongoose.model("SchoolOnboardingForms", SchoolOnboardingFormsSchema);