const mongoose = require('mongoose')
const CrudSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Skills: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('CRUD', CrudSchema)