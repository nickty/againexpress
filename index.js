const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

//db
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=>{
    console.log('DB connected')
})

app.use(express.json());

app.use('/api/users', require('./routes/users'))

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server is running on port ${port}`))