const { Router } = require('express');
const router = Router()
const requireAuth = require("../middleware/requireAuth")
const { getUsers, createUser, loginUser, deleteUser, updateUser } = require("../controllers/userController")


router.post("/signup", createUser)
router.post("/login", loginUser)
router.use(requireAuth)
router.get("/users", getUsers)
router.post("/users/delete", deleteUser)
router.post("/users/update", updateUser)


module.exports = router