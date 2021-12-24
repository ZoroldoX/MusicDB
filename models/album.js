const mongoose = require("mongoose")
const { Schema } = mongoose

const albumSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    composer: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
})

module.exports = mongoose.model('Album', albumSchema)