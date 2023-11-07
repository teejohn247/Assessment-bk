import mongoose from 'mongoose';

const ResultsSchema = new mongoose.Schema({
    template_name: { type: String, required: true },
    header:
        [{

            field_title: {
                type: String,
            },
            input_type: {
                type: String
            },
            options: [{
                field_title: {
                    type: String,
                },
                value: {
                    type: String,
                },
            }],

        }
        ],
    footer:
        [{
            field_title: {
                type: String,
            },
            input_type: {
                type: String
            },
            options: [{
                field_title: {
                    type: String,
                },
                value: {
                    type: String,
                },
            }],

        }
        ],
    // footer:
    // {
    //     form_fields: {
    //         type: Map,
    //         of: mongoose.Schema.Types.Mixed,
    //         required: true
    //     },
    //     logo: {
    //         type: String
    //     }
    // },
    quantitative:
    {
        assessmentType: [{
            assessment_type: {
                type: String,
            },
            maximum_score: {
                type: String,
            },
            assessment_category: [{
                assessment_name: {
                    type: String,
                },
                maximum_score: {
                    type: String
                }
            }],
        }],
        extraMetrics: {
            type: Array,
        },
        
    },
    grading_system:
        [{
            score_range: {
                type: Array,
            },
            grade: {
                type: String,
            },
            remark: {
                type: String,
            },
        }],
        
    behavioural_assessment:
    {
        metrics:[{
            metric: {
                type: String,
            },
        }],
        comments: {
            type: String,
        }
    },
    qualitative_assessment:
    {
        metrics:[{
            metric: {
                type: String,
            },
        }],
        comments: {
            type: String,
        }
    },
    comments:
        [{

            field_title: {
                type: String,
            },
            input_type: {
                type: String
            },

        }],

    students_information:
        [{
            field_title: {
                type: String,
            },
            input_type: {
                type: String
            },
            options: [{
                field_title: {
                    type: String,
                },
                value: {
                    type: String,
                },
            }],

        }],

     

    grading_key:
        [{
            key: {
                type: String,
            },
            remark: {
                type: String,
            },
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
        }
    }],
    enabled: {
        type: Boolean, default: true
    },
    created_by: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })


module.exports = mongoose.model("Results", ResultsSchema);