const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')
const Crudrouter = require('./Routes/Crudrouter')
const cors = require('cors')

app.use((req, res, next) => {
    console.log('path ' + req.path + ' method ' + req.method)
    next()
})
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGODB).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Backend connection successful')
    })
}).catch((error) => {
    console.log(error)
})
app.use('/api/', Crudrouter)