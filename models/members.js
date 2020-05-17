const mongoose = require('mongoose')

const membersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        equired: true
    }
})

const Members = module.exports = mongoose.model('Members', membersSchema)