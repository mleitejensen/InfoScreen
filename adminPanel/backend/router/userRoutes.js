const { Router } = require('express');
const router = Router()
const { getUsers, createUser, loginUser, deleteUser, updateUser } = require("../controllers/userController")


router.post("/signup", createUser)
router.post("/login", loginUser)
router.get("/users", getUsers)
router.post("/users/delete", deleteUser)
router.post("/users/update", updateUser)


module.exports = router