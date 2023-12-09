const { Router } = require('express');
const router = Router()
const userController = require("../controllers/userController")

router.get("/api", userController.users_get)

module.exports = router