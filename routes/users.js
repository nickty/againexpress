const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator/check')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const bcrypt = require('bcrypt')

const User = require('../models/User')


router.get('/', async (req, res) => {
    res.send('I am from user route')
})

router.post('/register',[
    check('name', 'Name is required').not().isEmpty(), 
    check('email', 'Email is required').isEmail(), 
    check('password', 'Password is not correct').isLength({min: 6})
], async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    try {

        const user = new User(req.body)

        const {password} = req.body

        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt)

        
        user.save()


        //console.log(user._id)

        jwt.sign({payload: user._id}, process.env.SecretKey, {expiresIn: 3600}, (err, token) => {
            if(err){

                throw err
            } 
            res.json({token})
        })

        //res.send(user)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
    
    
    
})


module.exports = router