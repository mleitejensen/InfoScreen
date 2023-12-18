import { useState, useEffect } from "react"
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

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

  const [content, setContent] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)


    const response = await fetch('http://localhost:9000/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ type, value: content })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
      setResult(json.result)
    }

    //setTimeout(removeResult(), 2000)*/
  }

  return (
    <div className="order">
      <form onSubmit={handleSubmit}>
        <div className="formTitle">Sign up</div>
        <label>Choose a type:</label>
        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          <option value="img">Image</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
        <label>Write content</label><br />
        <input type="text" name="content" onChange={(e) => setContent(e.target.value)}></input><br />

        <button disabled={isLoading}>Upload</button>
        {error && <div className="error">{error}</div>}
        {result && <div className="result">{result}</div>}

      </form>
      <br /><br /><br /><br /><br />
      {elements && elements.map((element) => (
        <div className="elementPreview" key={element._id}>
          <img src={element.value} alt="Random" width="100" height="100" className="orderElement"></img>
        </div>
      ))}

      <h2>Order of elements on info screen</h2>

      {!elements && "Loading image..."}
    </div>
  )
}

export default Order