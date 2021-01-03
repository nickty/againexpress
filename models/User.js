const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        maxlength: 32
        
    }, 
    email: {
        type: String,
        required: true, 
        unique: true
    }, 
    password: {
        type: String,
    }, 
    date : {
        type: Date, 
        default: Date.now  
    }
})

module.exports = User = mongoose.model('user', userSchema)