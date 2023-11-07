import mongoose from 'mongoose';


const SuperAdminPermissionsSchema = new mongoose.Schema({

    school: {
       add_school: {
            type: Boolean,
            default: true
        },
        edit_school: {
            type: Boolean,
            default: true

        },
        deactivate_school: {
            type: Boolean,
            default: true

        },
        view_all_schools: {
            type: Boolean,
            default: true

        }
    },
    class_creation: {
        assign_class_creation: {
             type: Boolean,
             default: true

         },
         deactivate_class_assigning: {
             type: Boolean,
             default: true

         }
     },
     notification: {
        create_notification_type: {
             type: Boolean,
             default: true

         },
         assign_notification: {
             type: Boolean,
             default: true

         },
         view_notification: {
            type: Boolean,
            default: true

        },
         edit_notification: {
            type: Boolean,
            default: true

        },
        deactivate_notification: {
            type: Boolean,
            default: true

        }
     },
     calender: {
        view_calender: {
             type: Boolean,
             default: true

         },
         assign_calender_schools: {
             type: Boolean,
             default: true

         },
         deactivate_calender: {
            type: Boolean,
            default: true

        }
     },
     user_management: {
        create_user: {
             type: Boolean,
             default: true

         },
         deactivate_user: {
             type: Boolean,
             default: true

         },
         view_users: {
            type: Boolean,
            default: true

        }
     },
     expansion: {
        expand_school: {
             type: Boolean,
             default: true

         },
         view_schools_and_school_branches: {
             type: Boolean,
             default: true

         },
         assign_expansion_funtionality: {
            type: Boolean,
            default: true

        }
     },
     forms: {
        edit_forms: {
             type: Boolean,
             default: true

         },
         assign_forms: {
             type: Boolean,
             default: true

         },
         deactivate_form_settings: {
            type: Boolean,
            default: true

        }
     },
    data_onboarding: {
        view_data_onboarding_forms: {
             type: Boolean,
             default: true

         },
         create_data_onboarding_forms: {
             type: Boolean,
             default: true

         },
         deactivate_data_onboarding_forms: {
            type: Boolean,
            default: true

        },
        assign_forms: {
            type: Boolean,
            default: true

        }
     },
     academics: {
       create_user: {
             type: Boolean,
             default: true

         },
         deactivate_user: {
             type: Boolean,
             default: true

         },
         view_users: {
            type: Boolean,
            default: true

        }
     },
}, { timestamps: true })


module.exports = mongoose.model("SuperAdminPermissions", SuperAdminPermissionsSchema);