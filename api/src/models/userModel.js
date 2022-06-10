import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    fullName: {
        type: String,
        required: 'Name must be provided'
    },
    email: {
        type: String,
        unique: true,
        required: 'Please provide an email'
    },
    hashPassword: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    userType: {
        type: String
    }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

