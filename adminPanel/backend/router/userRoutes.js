const { Router } = require('express');
const router = Router()
const { getUsers, createUser } = require("../controllers/userController")

router.get("/api/users", getUsers)
router.post("/api/create", createUser)

module.exports = router