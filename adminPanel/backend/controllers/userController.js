const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const InfoScreen = require("../models/infoScreenModel")

const createWebToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
}

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

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try{
    const user = await User.login(username, password)
    const token = createWebToken(user._id)
    res.status(200).json({username, token})
  }catch(error){
    res.status(400).json({ error: error.message })
  }
}

const deleteUser = async (req, res) => { // deleting element with _id
  const {id} = req.body
  try{ 
    const del = await User.deleteOne({_id: id}) 
    res.status(200).send(del)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const updateUser = async (req, res) => {
  const {id} = req.body
  const find = await User.findById(id)
  if(find.admin === false){
    try{
      const update = await User.findOneAndUpdate({_id: id}, {admin: true})
      res.status(200).send(update)
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }else{
    try{
      const update = await User.findOneAndUpdate({_id: id}, {admin: false})
      res.status(200).send(update)
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }
}



module.exports = {
  getUsers,
  createUser,
  loginUser,
  deleteUser,
  updateUser,
}

