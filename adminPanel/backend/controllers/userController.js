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

const createElement = async (req, res) => {
  const {value, order} = req.body

  try{
    const element = await InfoScreen.create({value, order})
    res.status(200).json(element)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const getElements = async (req, res) => {
  try{
    const elements = await InfoScreen.find({}).sort({order: +1})
    res.status(200).json(elements)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  createElement,
  getElements,
}

