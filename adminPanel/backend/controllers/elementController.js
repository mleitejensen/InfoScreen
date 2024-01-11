const InfoScreen = require("../models/infoScreenModel")
const musicModel = require("../models/musicModel")

const createElement = async (req, res) => {
    const {type, value} = req.body
    
    const elements = await InfoScreen.find({})

    try{
      const element = await InfoScreen.create({type, value, order: (elements.length + 1)})
      res.status(201).json(element)
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

  const deleteElement = async (req, res) => {
    const {id} = req.body
    try{
      const del = await InfoScreen.deleteOne({_id: id})
      res.status(200).send(del)
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }

  const initializeMusic = async (req, res) => {
    const {value} = req.body
    try{
      const music = await musicModel.create({value})
      res.status(201).json({music})
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }

  const uploadMusic = async (req, res) => {
    const {value} = req.body
    try{
      const filter = await musicModel.find({})
      const updatedMusic = await musicModel.findOneAndUpdate({filter, value})
      res.status(201).json({updatedMusic})
    }catch(error){
      res.status(400).json({error: error.message})
    } 
  }

  module.exports = {
    createElement,
    getElements,
    deleteElement,
    initializeMusic,
    uploadMusic,
  }
  