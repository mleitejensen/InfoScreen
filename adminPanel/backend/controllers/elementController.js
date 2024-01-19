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
      await InfoScreen.findOneAndUpdate(element, {order: i})
      i++
    }
    res.status(200).send(del)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  createElement,
  getElements,
  deleteElement,
}
