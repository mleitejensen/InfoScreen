const { Router } = require('express');
const router = Router()
const { getUsers, createUser, loginUser } = require("../controllers/userController")
const { createElement, getElements } = require("../controllers/elementController")

router.get("/users", getUsers)
router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/order/create", createElement)
router.get("/order", getElements)

module.exports = router