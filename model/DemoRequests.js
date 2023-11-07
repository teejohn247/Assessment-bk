import mongoose from 'mongoose';

const DemoRequestsSchema = new mongoose.Schema({
    // schoolName: { type: String,  trim: true, required: true},
    // contactPerson: { type: String, trim: true ,required: true},
    // contactEmail: { type: String, trim: true, required: true},
    // contactPhoneNumber: { type: String, trim: true,required: true },
    // contactLocation: { type: String, trim: true },
    // schoolRole: { type: String, trim: true, required: true },
    // AreaOfInterest: { type: String, trim: true, required: true },
    // HowDidYouHear: { type: String, trim: true },
    requestDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending"},
    payload: {
        cancel_url: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        event: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        new_invitee: {
            type: String,
        },
        old_invitee: {
            type: String,
        },
        questions_and_answers: [{
            question_uuid: {
                type: String,
            },
            question: {
                type: String,
            },
            answer: {
                type: String,
            },
        }],
        reschedule_url: {
            type: String,
        },
        reschedule: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "active"
        },
        text_reminder_number: {
            type: String,
        },
        timezone:{
            type: String,
        },
        uri:{
            type: String,
            required: true
        },
        cancelled: {
            type: Boolean,
            default: false
        },
        tracking: {
            utm_campaign: {
                type: String,
            },
            utm_source: {
                type: String,
            },
            utm_medium: {
                type: String,
            },
            utm_term: {
                type: String,
            },
            salesforce_uuid: {
                type: String,
            },
        },
        updated_at: {
            type: Date,
            default: false
        },
    },
}, { timestamps: true }); 


module.exports = mongoose.model("DemoRequests", DemoRequestsSchema);