import mongoose from "mongoose";
const userScheme = mongoose.Schema(
    {
        fName: String,
        lName: String,
        email: {
            type: String,
            unique: true,
        },
        userName: {
            type: String,
            unique: true,
        },
        password: String,
        dateOfBirth: String,
        gender: String,
        phone: String,
        about: String,
        profileImage: String,
        country: String,
        city: String,
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        interests: [String],
        events: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        volunteering: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userScheme);
export default User;
