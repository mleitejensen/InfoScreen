const InfoScreen = require("../models/infoScreenModel")

const createElement = async (req, res) => {
    const {type, value} = req.body
    
    const elements = await InfoScreen.find({})

    try{
      const element = await InfoScreen.create({type, value, order: (elements.length + 1)})
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
    createElement,
    getElements,
  }
  