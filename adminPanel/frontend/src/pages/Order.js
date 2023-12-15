import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const Order = () => {
  const [elements, setElements] = useState()

  useEffect(() => {
    makeAPICall()
  }, [])

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:9000/order',);
      let data = await response.json();
      setElements(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="order">
      <DragDropContext>
        <Droppable droppableId="images">
          {(provided) => (
            <ul className="orderList" {...provided.droppableProps} ref={provided.innerRef}>
              {elements && elements.map((element) => (
                <Draggable key={element._id}>
                  <div className="elementPreview" key={element._id}>
                    <img src={element.value} alt="Random" width="100" height="100" className="orderElement"></img>
                  </div>
                
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <h2>Order of elements on info screen</h2>
      
      {!elements && "Loading image..."}
    </div>
  )
}

export default Order