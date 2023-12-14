import {useState, useEffect} from "react"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"

const Order = () => {
  const [elements, setElements] = useState()
    
    useEffect(() => {
        makeAPICall()
      },[])
      
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
            <Droppable droppableId="droppable" >  
                {(provided, snapshot) => (  
                    <div {...provided.droppableProps} ref={provided.innerRef}>  
                        {elements.map((item, index) => (  
                            <Draggable draggableId={item.id} index={index}>  
                                {(provided, snapshot) => (  
                                   <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>  
                                  
                                   </div>  
                                )}  
                            </Draggable>  
                        ))}  
                    </div>  
                )}  
            </Droppable>  
        </DragDropContext>
        <h2>Order of elements on info screen</h2>
        {elements && elements.map((element) => (
            <div className="elementPreview" key={element._id}>
              <img src={element.value} alt="Random" width="400" height="400"></img>
            </div>
        ))}
        {!elements && "Loading..."}
      </div>
    )
  }
  
  export default Order