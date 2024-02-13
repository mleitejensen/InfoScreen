const InfoScreen = require("../models/infoScreenModel")

const createElement = async (req, res) => { // create an element
  const {type, value, duration} = req.body
  const elements = await InfoScreen.find({})
  try{
    if(elements.length < 10){ // can only create elements when you have less than 10 elements
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
      console.log(element)
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
    console.log(update)
    res.status(200).json(update)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const moveOrderOfElement = async (req ,res) => {
  const {id, direction} = req.body
  let elementToMove = await InfoScreen.findOne({_id: id})
  const elements = await InfoScreen.find({}).sort({order: +1})
  try{
    if(direction === "up"){
       let elementToTakePlace = await InfoScreen.findOne({order: elementToMove.order + 1})
      //let element = await InfoScreen.findOneAndUpdate(movingElement, {order: movingElement.order + 1})
      let move = await InfoScreen.findOneAndUpdate(elementToMove, {
        _id: elementToTakePlace._id, 
        type: elementToTakePlace.type,
        value: elementToTakePlace.value
      })
      let movingDown = await InfoScreen.findOne({order: movingElement.order + 1 })
      console.log(movingElement.order)
      // replace everything other than order
      res.status(200).json({ movingElement })
    }else if( direction === "down"){
      let element = await InfoScreen.findOne({order: (movingElement.order - 1)})
      res.status(200).json({element, elements})
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
