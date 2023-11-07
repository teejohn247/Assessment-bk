import mongoose from 'mongoose';


const NotificationLogSchema = new mongoose.Schema({
    notificationTypeName: {type: String, required: true},
    message: {type: String, required: true},
    schools: [{
        school_id: {
            type: String,
        },
        schoolName: {
            type: String,
            required: true
        },
        schoolEmail: {
            type: String
        },
        schoolPhoneNumber: {
            type: String
        }
    }],
    attachment: {type: String},
    date: { type: Date },
    channel: {type: String, required: true},
    created_by: {type: String, required: true},
}, { timestamps: true })


module.exports = mongoose.model("NotificationLog", NotificationLogSchema);