const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Members = require('./models/members.js')
const router =require('./routes/router.js')
const app = express()
const bodyParser = require('body-parser')

//Database connection
mongoose.connect('mongodb://localhost/members', { useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB...')
})
db.on('err', (err) => {
    console.log(err.message)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')



//Home
app.get('/', (req, res) => {
    res.render('layout', {
        title: 'Hello World'
    })
})

//Get All Members
app.get('/all/members', (req, res) => {
    Members.find({}, (err, members) => {
        if (err) return console.log(err)
        else res.render('index', {
            title: 'All members',
            members: members
        })
    })
})

app.get('/members/:id', (req, res) => {
    Members.findById(req.params.id, (err, members) => {
        if (err) return console.log(err.message)
        else res.render('members', {
            title: 'Member',
            members: members
        })
    })
})


//Add Members
app.get('/add/members', (req, res) => {
    res.render('add', {
        title: 'Add'
    })
})

app.post('/add/members', (req, res) => {
    const member = new Members()
    member.name = req.body.name
    member.age = req.body.age

    member.save((err) => {
        if (err) return console.log(err.message)
        else res.redirect('/all/members')
    })
})

app.get('/edit/members/:id', (req, res) => {
    Members.findById(req.params.id, (err, members) => {
        if (err) return console.log(err.message)
        else res.render('edit_one', {
            title: 'Member',
            members: members
        })
    })
})


app.post('/edit/members/:id', (req, res) => {
    const member = {}
    member.name = req.body.name
    member.age = req.body.age

    const query = { _id: req.params.id }

    Members.updateOne(query, member, (err) => {
        if (err) return console.log(err)
        else res.redirect('/all/members')
    })
})

app.get('/delete/members/:id', (req, res) => {
    Members.findByIdAndDelete(req.params.id, (err) => {
        if (err) return console.log(err.message)
        else res.redirect('/all/members')
    })
})







app.listen(3000)
