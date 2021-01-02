const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/User')


router.get('/', async (req, res) => {
    res.send('I am from user route')
})

router.post('/register', async (req, res) => {

    //console.log(req.body)

    //const {name, email, password} = req.body
    
    const user = new User(req.body)

    const {name, email, password} = req.body

    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(password, salt)



    user.save()

    res.send(user)
    
})


module.exports = router