require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const app = express()
const userRoutes = require("./router/userRoutes")
const cors = require("cors")
const dbURI = process.env.DB_URI
const port = process.env.PORT

app.use(express.json())

/*
var corsOptions = {
    origin: 'http://localhost:3000',
}
*/

app.use(cors())

app.listen(port)

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to database on port " + port)
    })
    .catch((err) => {
        console.log(err)
    })

app.use(userRoutes)