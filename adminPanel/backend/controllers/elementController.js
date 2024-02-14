const InfoScreen = require("../models/infoScreenModel")

const createElement = async (req, res) => { // create an element
  const {type, value, duration} = req.body
  const elements = await InfoScreen.find({})
  const maxElements = 10
  try{
    if(elements.length < maxElements){ // can only create elements when you have less than 10 elements
      const element = await InfoScreen.create({type, value, duration, order: (elements.length + 1)})
      res.status(201).json(element)
    } else{
      throw Error("You can not have more than 10 elements at a time")
    }
  }catch(error){
    res.status(400).json({error: error.message})
  } 
}
  
const getElements = async (req, res) => { // gets a list of all elements and sorts by order
  try{
    const elements = await InfoScreen.find({}).sort({order: +1})
    res.status(200).json(elements)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const deleteElement = async (req, res) => { // deleting element with _id
  const {id} = req.body
  try{ 
    const del = await InfoScreen.deleteOne({_id: id}) 
    const elements = await InfoScreen.find({}).sort({order: +1})
    let i = 1
    for(const element of elements){ //updating order numbers when deleting elements
      await InfoScreen.findOneAndUpdate(element, {order: i}, {new: true})
      i++
    }
    res.status(200).json(del)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const updateElement = async (req, res) => {
  const {id, type, value, duration, order, topText, bottomText} = req.body
  try{
    const update = await InfoScreen.findOneAndUpdate({_id: id}, { type, value, duration, order, topText, bottomText }, {new: true})
    res.status(200).json(update)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const moveOrderOfElement = async (req ,res) => {
  const {id, direction} = req.body
  const elementToMove = await InfoScreen.findOne({_id: id})
  const elements = await InfoScreen.find({})
  try{
    if(direction === "up"){
      if(elements.length < (elementToMove.order + 1)){
        throw Error("Element is already at the last position")
      }
      // Make the order: 11 before making the elementToTakePlace order: - 1. Then the elementToMove can take the place is wants
      // You have to do this because order is a unique value
      await InfoScreen.findOneAndUpdate({order: elementToMove.order}, {order: 11})
      const elementToTakePlace = await InfoScreen.findOneAndUpdate({order: elementToMove.order + 1}, {order: elementToMove.order})
      const moveElementToMoveUp = await InfoScreen.findOneAndUpdate({order: 11}, {order: elementToMove.order + 1})

      res.status(200).json({movedUp: moveElementToMoveUp, movedDown: elementToTakePlace })
    }else if( direction === "down"){
      if(elements.length < (elementToMove.order - 1)){
        throw Error("Element is already at the first position")
      }
      // Make the order: 11 before making the elementToTakePlace order: + 1. Then the elementToMove can take the place is wants
      // You have to do this because order is a unique value
      await InfoScreen.findOneAndUpdate({order: elementToMove.order}, {order: 11})
      const elementToTakePlace = await InfoScreen.findOneAndUpdate({order: elementToMove.order - 1}, {order: elementToMove.order})
      const moveElementToMoveDown = await InfoScreen.findOneAndUpdate({order: 11}, {order: elementToMove.order - 1})

      res.status(200).json({movedDown: moveElementToMoveDown, movedUp: elementToTakePlace})
    }

  }catch(error){
    res.status(400).json({error: error.message})
  }

}

module.exports = {
  createElement,
  getElements,
  deleteElement,
  updateElement,
  moveOrderOfElement,
}
