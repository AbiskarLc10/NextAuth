import mongoose, { Document, model, Schema } from "mongoose";


export interface User extends Document{
    username: string,
    email: string,
    password: string,
    phone: string,
    profileImg: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAdmin: boolean
}


export const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true,"Email is required"],
        match: [/^[a-zA-Z]+(?:[\w\W]*)*[a-zA-Z0-9]*\@[A-Za-z]{2,}\.[a-zA-Z]{2,4}$/,"Not a valid email"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [/^(?=.*[A-Z])(?=.*[\W]).{5,}$/,"Must contain an uppercase letter and a special character with min length 5 characters"]
    },
    phone: {
        type: String,
        required: [true,"Contact Number is required"],
        match: [/(?=98|97[\d]).{10}/,"Number must have 10 characters and valid for Nepal"]
    },
    profileImg:{
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s"
    },
    verifyCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true})



const UserModel = ( mongoose.models.user as mongoose.Model<User>) || model<User>('user',UserSchema);

export default UserModel;
