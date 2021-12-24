const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const User = require('./models/user')
const Song = require('./models/song')
const Album = require('./models/album')
const Concert = require('./models/concert')
const Artist = require('./models/artist')

mongoose.connect('mongodb://localhost:27017/musicdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongod')
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })

const sessionConfig = {
    name: 'session',
    secret: 'musicdb',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

app.use(session(sessionConfig))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/login', (req, res) => {
    return res.render('login')
})

app.post('/login', async (req, res) => {
    try {

        if (req.session.user) {
            return res.redirect('/artists')
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Email or Password is incorrect')
        }
        if (!(user.password === password)) {
            throw new Error('Email or Password is incorrect')
        }

        req.session.user = user.email;
        return res.redirect('/artists')

    } catch (e) {
        return res.send(e.message)
    }
})

app.get('/artists', async (req, res) => {
    try {

        if (!req.session.user) {
            return res.redirect('/login');
        }
        const { search } = req.query;
        let artists
        if (search) {
            artists = await Artist.find({ name: { $regex: '.*' + search + '.*' } })
            if (!artists.length) {
                artists = await Artist.find({})
            }
        } else {
            artists = await Artist.find({})
        }

        if (!artists.length) {
            throw new Error('No Artists Found')
        }
        return res.render('artists', { artists, search })

    } catch (e) {
        return res.send(e.message)
    }
})

app.get('/albums', async (req, res) => {
    try {

        if (!req.session.user) {
            return res.redirect('/login');
        }
        const { search } = req.query;
        let albums
        if (search) {
            albums = await Album.find({ name: { $regex: '.*' + search + '.*' } }).populate('composer')
            if (!albums.length) {
                albums = await Album.find({}).populate('composer')
            }
        } else {
            albums = await Album.find({}).populate('composer')
        }
        if (!albums.length) {
            throw new Error('No Artists Found')
        }
        return res.render('albums', { albums, search })

    } catch (e) {
        return res.send(e.message)
    }
})

app.get('/concerts', async (req, res) => {
    try {

        if (!req.session.user) {
            return res.redirect('/login');
        }
        const { search } = req.query;
        let concerts
        if (search) {
            concerts = await Concert.find({ location: { $regex: '.*' + search + '.*' } }).populate('artist')
            if (!concerts.length) {
                concerts = await Concert.find({}).populate('artist')
            }
        } else {
            concerts = await Concert.find({}).populate('artist')
        }
        if (!concerts.length) {
            throw new Error('No Artists Found')
        }
        return res.render('concerts', { concerts, search })

    } catch (e) {
        return res.send(e.message)
    }
})

app.get('/songs', async (req, res) => {
    try {

        if (!req.session.user) {
            return res.redirect('/login');
        }
        const { search } = req.query;
        let songs
        if (search) {
            songs = await Song.find({ name: { $regex: '.*' + search + '.*' } }).populate('album').populate('composer')
            if (!songs.length) {
                songs = await Song.find({}).populate('album').populate('composer')
            }
        } else {
            songs = await Song.find({}).populate('album').populate('composer')
        }

        if (!songs.length) {
            throw new Error('No Songs Found')
        }
        return res.render('songs', { songs, search })

    } catch (e) {
        return res.send(e.message)
    }
})

app.get('/', (req, res) => {

    if (req.session.user) {
        return res.redirect('/artists')
    }
    return res.redirect('/login')
})

app.get('*', (req, res) => {
    return res.redirect('/artists')
})

app.listen(3000, () => {
    console.log('Hosted on port 3000')
})