const mongoose = require("mongoose")
const { Schema } = mongoose

const concertSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    location: {
        type: String,
        required: true
    },

    attendance: {
        type: Number,
        required: true
    },

    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }

})

module.exports = mongoose.model('Concert', concertSchema)