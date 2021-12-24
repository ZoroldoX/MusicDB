const Song = require("../models/song")
const Artist = require("../models/artist")
const Concert = require("../models/concert")
const Album = require("../models/album")

const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/musicdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })

const artists = [
    {
        name: 'Weeknd',
        dob: '1990-02-16',
        gender: 'Male'
    },
    {
        name: 'Joji',
        dob: '1991-03-17',
        gender: 'Male'
    },
    {
        name: 'Justin Bieber',
        dob: '1992-04-18',
        gender: 'Male'
    },
    {
        name: 'Ed Sheeran',
        dob: '1993-05-19',
        gender: 'Male'
    },
    {
        name: 'Billie Eilish',
        dob: '1994-06-20',
        gender: 'Male'
    },
    {
        name: 'Ritviz',
        dob: '1995-06-21',
        gender: 'Male'
    },
    {
        name: 'Juice Wrld',
        dob: '1990-02-22',
        gender: 'Male'
    },
]

const albums = [
    {
        name: 'Beauty Behind The Madness',
        composer: '61ba39b8acf3141284bb001c'
    },
    {
        name: 'Starboy',
        composer: '61ba39b8acf3141284bb001c'
    },
    {
        name: 'Ballards 1',
        composer: '61ba39b8acf3141284bb001d'
    },
    {
        name: 'Nectar',
        composer: '61ba39b8acf3141284bb001d'
    },
    {
        name: 'Purpose',
        composer: '61ba39b8acf3141284bb001e'
    },
    {
        name: 'Beleive',
        composer: '61ba39b8acf3141284bb001e'
    },
    {
        name: 'Multiply',
        composer: '61ba39b8acf3141284bb001f'
    },
    {
        name: 'Divide',
        composer: '61ba39b8acf3141284bb001f'
    },
    {
        name: 'Happier Than Ever',
        composer: '61ba39b8acf3141284bb0020'
    },
    {
        name: 'Dont Smile at me',
        composer: '61ba39b8acf3141284bb0020'
    },
    {
        name: 'Fighting Demons',
        composer: '61ba39b8acf3141284bb0022'
    },
    {
        name: 'Legends Never Die',
        composer: '61ba39b8acf3141284bb0022'
    },
    {
        name: 'Ved',
        composer: '61ba39b8acf3141284bb0021'
    },
    {
        name: 'Baaraat',
        composer: '61ba39b8acf3141284bb0021'
    }
]

const concerts = [
    {
        location: 'Merksem,Belgium',
        date: '2021-10-24',
        attendance: 61000,
        artist: '61ba39b8acf3141284bb001c'
    },
    {
        location: 'Tokyo,Japan',
        date: '2020-07-14',
        attendance: 52000,
        artist: '61ba39b8acf3141284bb001c'
    },
    {
        location: 'London,UK',
        date: '2018-12-12',
        attendance: 70000,
        artist: '61ba39b8acf3141284bb001d'
    },
    {
        location: 'Melkweg,Amsterdam',
        date: '2018-12-09',
        attendance: 52000,
        artist: '61ba39b8acf3141284bb001d'
    },
    {
        location: 'California,USA',
        date: '2013-09-12',
        attendance: 808000,
        artist: '61ba39b8acf3141284bb001e'
    },
    {
        location: 'ShenZhen,Hong Kong',
        date: '2016-03-09',
        attendance: 100000,
        artist: '61ba39b8acf3141284bb001e'
    },
    {
        location: 'Ipswich, UK',
        date: '2019-08-25',
        attendance: 78000,
        artist: '61ba39b8acf3141284bb001f'
    },
    {
        location: 'Stockholm,Sweden',
        date: '2018-06-18',
        attendance: 69000,
        artist: '61ba39b8acf3141284bb001f'
    },
    {
        location: '	Guadalajara,Mexico',
        date: '2020-05-25',
        attendance: 90000,
        artist: '61ba39b8acf3141284bb0020'
    },
    {
        location: 'Orlando,US',
        date: '2013-04-09',
        attendance: 12000,
        artist: '61ba39b8acf3141284bb0020'
    },
    {
        location: 'Mumbai,India',
        date: '2017-01-17',
        attendance: 100000,
        artist: '61ba39b8acf3141284bb0021'
    },
    {
        location: 'Delhi,India',
        date: '2017-08-23',
        attendance: 89000,
        artist: '61ba39b8acf3141284bb0021'
    },
    {
        location: 'Boston,US',
        date: '2019-05-21',
        attendance: 30000,
        artist: '61ba39b8acf3141284bb0022'
    },
    {
        location: 'New York,US',
        date: '2014-10-05',
        attendance: 225000,
        artist: '61ba39b8acf3141284bb0022'
    },

]

async function insert() {
    // await Artist.insertMany(artists)
    // await Album.insertMany(albums)
    //await Song.insertMany(songs)
    await Concert.insertMany(concerts)  //Comment out what NOT to insert
}


insert().then(() => {
    mongoose.connection.close();
})



//To execute file --> node seeds/index.js