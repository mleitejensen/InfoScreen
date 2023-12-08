const express = require("express")
const mongoose = require('mongoose')
const app = express()
const routes = require("./router/routes")
const dbURI = "mongodb+srv://admin:Passord1@auth.bvqunpm.mongodb.net/?retryWrites=true&w=majority"

app.use(express.json())

app.listen(9000)

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to database")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(routes)