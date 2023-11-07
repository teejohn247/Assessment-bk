import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
    schoolName: { type: String, trim: true, required: true },
    schoolEmail: { type: String, trim: true, required: true },
    phoneNumber: { type: String, trim: true},
    country: { type: String },
    contactPerson: { type: String },
    contactPersonPhoneNumber: { type: String, required: true },
    schoolLogo: { type: String },
    invitationToken: { type: String },
    tenantId: { type: String },
    numberOfCampuses: { type: Number, default: 1 },
    addresses: [
        {
            campusAddress: { type: String },
            campusState: { type: String },
        }
    ],
    school_onboarding_form_assigned: [{
        form_id: {
            type: String,
        },
        form_name: {
            type: String
        },
        module: {
            type: String,
            default: "student"

        },
        date_assigned: {
            type: Date
        }
    }],
    results_assigned: [{
        result_id: {
            type: String,
        },
        result_name: {
            type: String
        },
        date_assigned: {
            type: Date
        }
    }],
    staffs_onboarding_form_assigned: [{
        form_id: {
            type: String,
        },
        form_name: {
            type: String
        },
        date_assigned: {
            type: Date
        }
    }],
    calenders_settings: {
        create_calender: {
            type: Boolean,
            default: false
        },
        edit_calender_events: {
            type: Boolean,
            default: false
        },
        download_calender: {
            type: Boolean,
            default: false
        },
        share_calender: {
            type: Boolean,
            default: false
        }, 
        delete_calender: {
            type: Boolean,
            default: false
        }
    },

    results_settings: {
        create_assessment_type: {
            type: Boolean,
            default: false
        },
        create_assessment_categories: {
            type: Boolean,
            default: false
        },
        create_grading_system: {
            type: Boolean,
            default: false
        },
        create_score_columns: {
            type: Boolean,
            default: false
        }, 
        setup_comments_columns: {
            type: Boolean,
            default: false
        },
    },
    
    data_onboarding_settings: {
        bulk_upload: {
            type: Boolean,
            default: false
        }
    },

    academics_settings: {
        create_academic_year: {
            type: Boolean,
            default: false
        },
      
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
        },
        create_terms: {
            type: Boolean,
            default: false
        },
    },

        notification_types: [{
            notification_id: {
                type: String,
            },
            notification_name: {
                type: String
            },
            enabled: {
                type: Boolean,
                default: false
            }
        }],

    notifications_settings: {
        notification_targets: {
            parents: {
                type: Boolean,
                default: false
            },
            teachers: {
                type: Boolean,
                default: false
            },
            student: {
                type: Boolean,
                default: false
            }
        },
        notification_channels: {
            whatsapp: {
                type: Boolean,
                default: false
            },
            email: {
                type: Boolean,
                default: false
            },
            sms: {
                type: Boolean,
                default: false
            }
        },
      
    },
    notifications_assigned: [{
        notification_id: {
            type: String,
        },
        notification_name: {
            type: String
        },
        notification_targets: [{
            parents: {
                type: Boolean,
                default: false
            },
            teachers: {
                type: Boolean,
                default: false
            },
            student: {
                type: Boolean,
                default: false
            }
        }],
        notification_channels: [{
            whatsapp: {
                type: Boolean,
                default: false
            },
            email: {
                type: Boolean,
                default: false
            },
            sms: {
                type: Boolean,
                default: false
            }
        }],
        enabled: {
        type: Boolean,
        default: false
        }
      
    }],
   
    data_onboarding_template_assigned: [{
        template_id: {
            type: String,
        },
        template_name: {
            type: String
        },
        files: [{
            file_name: {
                type: String,
            },
            file_path: {
                type: String
            }
        }],
        date_assigned: {
            type: Date
        },
        type: {
            type: String
        },

    }],
    expansion: { type: Boolean, default: false },
    activated:{ type: Boolean, default: true },
    onboarded: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model("School", SchoolSchema);


