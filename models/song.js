const mongoose = require("mongoose")
const { Schema } = mongoose;

const songSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    composer: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },

})

module.exports = mongoose.model('Song', songSchema)