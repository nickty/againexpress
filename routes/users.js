const express = require('express')
const router = express.Router()

const User = require('../models/User')


router.get('/', (req, res) => {
    res.send('I am from user route')
})

router.post('/register', (req, res) => {

    //console.log(req.body)

    //const {name, email, password} = req.body
    
    const user = new User(req.body)

    user.save()

    res.send(user)
    
})


module.exports = router