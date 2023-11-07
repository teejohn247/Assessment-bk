import mongoose from 'mongoose';

const FormsSchema = new mongoose.Schema({
    form_types: 
        [{
            field_title: {
                type: String,
                required: true
            },
            input_type: {
                type: String,
                required: true
            },
        }],

  
      
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })


module.exports = mongoose.model("Forms", FormsSchema);


