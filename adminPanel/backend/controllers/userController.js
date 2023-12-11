const User = require("../models/userModel")
const mongoose = require("mongoose")

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({username: +1})
  
  res.status(200).json(users)
}

const createUser = async (req, res) => {
  
  const { username, password, admin } = req.body;

  try {
    const user = await User.create({ username, password, admin });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    console.log(err)
    res.status(400).json({ err });
  }
}


module.exports = {
    getUsers,
    createUser,
}

