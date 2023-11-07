import mongoose from 'mongoose';

const QuestionTypesSchema = new mongoose.Schema({
            field_title: {
                type: String,
                required: true
            },
            input_type: {
                type: String,
                required: true
            },
            options:[{
                field_title: {
                    type: String,
                },
                
            }]
            // multiple_choice_question: 
            // [{
            //     field_title: {
            //         type: String,
            //     },
            //     no_of_options:{
            //         type: String,
            //     },
            //     input_type: {
            //         type: String,
            //     },
            //     options:[{
            //         field_title: {
            //             type: String,
            //         },
            //         input_type: {
            //             type: String,
            //         },
            //     }]
            // }],

        },
    { timestamps: true })


module.exports = mongoose.model("QuestionTypes", QuestionTypesSchema);