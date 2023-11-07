import mongoose from 'mongoose';


let db;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: '',
    },
    admin: {
      type: String,
    },
    adminId: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false

    },
    isAdmin: {
      type: Boolean,
      default: false

    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
