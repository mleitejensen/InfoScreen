const { Router } = require('express');
const router = Router()
const { getUsers, createUser, loginUser, createElement, getElements } = require("../controllers/userController")

router.get("/users", getUsers)
router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/order/create", createElement)
router.get("/order", getElements)

module.exports = router