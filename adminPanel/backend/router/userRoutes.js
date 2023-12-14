const { Router } = require('express');
const router = Router()
const { getUsers, createUser, loginUser } = require("../controllers/userController")

router.get("/users", getUsers)
router.post("/signup", createUser)
router.post("/login", loginUser)

module.exports = router