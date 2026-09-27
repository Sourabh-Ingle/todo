import { required } from "joi";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 50,
            minlength: 2,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            trime: true,
            required:[true, "Password is required!!!"],
            maxlength: 50,
            minlength: 8,
            select:false
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer",
            required: [true, "Role is required"]
        },
        isVerify: {
            type: Boolean,
            default:false
        },
        refreshToken: {
            type: String,
            select:false
        },
        verificationToken: {
            type: String,
            select:false
        },
        resetPasswordToken: {
            type: String,
            select: false
        },
        resetPasswordExpiry: {
            type: String,
            select: false
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema);