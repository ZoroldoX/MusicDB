const Song = require("../models/song")
const Artist = require("../models/artist")
const Concert = require("../models/concert")
const Album = require("../models/album")
const User = require("../models/user")

const songs = require('./songs')
const artists = require('./artists')
const albums = require('./albums')
const concerts = require('./concerts')

const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/musicdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


async function insert() {
    await Artist.insertMany(artists)
    await Album.insertMany(albums)
    await Song.insertMany(songs)
    await Concert.insertMany(concerts)
}

async function createUser() {
    try {

        const users = [
            {
                email: 'prabhudhruv@gmail.com',
                password: 'iamdhruv'
            },
            {
                email: 'astroharsha@gmail.com',
                password: 'iamharsha'
            }
        ]

        await User.insertMany(users)

    } catch (e) {
        console.log(e);
    }
}


// insert().then(() => {
//     mongoose.connection.close();
// })

//  createUser().then(() => {
//      mongoose.connection.close()
//  })
