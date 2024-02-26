import mongoose from 'mongoose';


let db;

const UserSchema = new mongoose.Schema(
  {
    firstName : {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: '',
    },
    lga: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'zonalHead',
      enum: ['director', 'superAdmin', 'zonalHead']
    }
  },
  { timestamps: true },
);

module.exports = UserSchema;



module.exports = mongoose.model("LasepaUser", UserSchema);
