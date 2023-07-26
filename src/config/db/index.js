const mongoose = require("mongoose");

async function connect() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/MetawayEdu')
        .then(() => console.log('Connected to MongoDB!!!'));
    } catch (error) {
        // console.log(error);
        console.log("Connect Failue!!!");
    }
}

module.exports = { connect }