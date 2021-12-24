const Song = require("../models/song")
const Artist = require("../models/artist")
const Concert = require("../models/concert")
const Album = require("../models/album")

const songs = require('./songs')
const artists = require('./artists')
const albums = require('./albums')
const concerts = require('./concerts')

const mongoose = require("mongoose")
const artist = require("../models/artist")
const concert = require("../models/concert")
mongoose.connect('mongodb://localhost:27017/musicdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


async function insert() {
    //await Artist.insertMany(artists)
    //await Album.insertMany(albums)
    //await Song.insertMany(songs)
    //await Concert.insertMany(concerts) 
}


insert().then(() => {
    mongoose.connection.close();
})


//song.composer.dob.toString().slice(4, 15)