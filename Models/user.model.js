const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { required } = require("joi");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1',
    },
    role: {
        type: String,
        enum: ['member', 'staff', 'admin'],
        default: 'member',
    },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        console.log(`Called before save::: ${this.email} ${this.password} `);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isCheckedPasswrod = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        // next(error)
    }
}

module.exports = mongoose.model('User', UserSchema)