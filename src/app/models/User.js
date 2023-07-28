const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema ({
    role: {type: String, maxLength: 50, default: "member"},
    username: {type: String, maxLength: 50},
    password: {type: String, maxLength: 50},
    avatar: {type: String, maxLength: 256},
    name: {type: String, maxLength: 50},
    sex: {type: String, maxLength: 50, default: "Nam"},
    birthDay: {type: Date},
    phoneNumber: {type: Number, maxLength: 10},
    email: {type: String, maxLength: 255},
    address: {type: String, maxLength: 500},
    hobby: {type: Array, maxLength: 255},
    isActive: {type: Boolean, default: "true"},
    dateCreate: {type: Date, default: Date.now},
})

module.exports = mongoose.model("User", User);