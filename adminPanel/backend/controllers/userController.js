const User = require("../models/userModel")
const mongoose = require("mongoose")

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({username: +1})
  res.status(200).json(users)
}

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try{
    const user = await User.signup(username, password)
    res.status(200).json({ result: `${user.username} created`})
  }catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
    getUsers,
    createUser,
}

