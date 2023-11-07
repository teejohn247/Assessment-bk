import mongoose from 'mongoose';

const FormularsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    formula: {
        type: String
    }
    // columns:
    // [{
    //     column_name: {
    //         type: String
    //     },
    //     formula: {
    //         type: String
    //     }
    // }],
}, { timestamps: true })


module.exports = mongoose.model("Formulars", FormularsSchema);


