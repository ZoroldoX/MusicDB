const mongoose = require("mongoose")
const { Schema } = mongoose

const artistSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    dob: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Artist', artistSchema)