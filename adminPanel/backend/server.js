require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const app = express()
const routes = require("./router/routes")
const dbURI = process.env.DBURI
const port = process.env.PORT

app.use(express.json())

app.listen(port)

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to database on port " + port)
    })
    .catch((err) => {
        console.log(err)
    })

app.use(routes)