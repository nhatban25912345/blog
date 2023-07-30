const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: {type: String, require: true, },
    description: {type: String},
    image: {type: String},
    videoId: {type: String, require: true, },
    level: {type: String},
    slug: {type: String, require: true,}
}, {
    timestamps: true,
})

module.exports = mongoose.model("Course", Course)

