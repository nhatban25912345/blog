const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema ({
    role: {type: String, maxLength: 50, default: "member"},
    username: {type: String, maxLength: 50, require: true, unique: true, sparse: true, index: true},
    password: {type: String, maxLength: 50, require: true},
    avatar: {type: String, maxLength: 256},
    name: {type: String, maxLength: 50, text: true},
    sex: {type: String, maxLength: 50, default: "nam"},
    birthDay: {type: Date},
    phoneNumber: {type: String, maxLength: 10},
    email: {type: String, maxLength: 255, unique: true, sparse: true, index: true},
    address: {type: String, maxLength: 500},
    hobby: {type: Array, maxLength: 255},
    isActive: {type: Boolean, default: "true"},
}, {
    timeStamps: true,
})

module.exports = mongoose.model("User", User);