import { useState, useEffect} from "react"
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
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const [elementContent, setElementContent] = useState('')
  const [musicContent, setMusicContent] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [result, setResult] = useState(null)

  const createElement = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)


    const response = await fetch('http://localhost:9000/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ type, value: elementContent })
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

  const uploadMusic = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)
    const response = await fetch('http://localhost:9000/order/music/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ type, value: musicContent })
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
  }

  const deleteElement = async (req, res) => {
    
  }

  return (
    <div className="order">
      <form onSubmit={createElement}>
        <div className="formTitle">Upload something to show on the info panel</div>
        <label>Choose a type:</label>
        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          <option value="img">Image</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select><br />
        <label>Write content</label><br />
        <input type="text" name="content" onChange={(e) => setElementContent(e.target.value)}></input><br /><br />

        <button disabled={isLoading}>Upload</button>
        {error && <div className="error">{error}</div>}
        {result && <div className="result">{result}</div>}

      </form>

      <form onSubmit={uploadMusic}>
        <div>Upload background music</div>
        <label>Upload a youtube url here</label>
        <input type="text" placeholder="https://youtube.com/..." onChange={(e) => setMusicContent(e.target.value)}/>

        <button disabled={isLoading}>Upload</button>
        {error && <div className="error">{error}</div>}
        {result && <div className="result">{result}</div>}
      </form>
      <br /><br />
      <h2>Order of elements on info screen</h2>
      {elements && elements.map((element) => (
        <div className="elementPreview" key={element._id}>
          {element.type === "img" && 
          <div className="orderElement">
            <img src={element.value} alt="Random" width="100" height="100"></img>
            <p className="orderNumber">{element.order}</p>
            <p onClick={deleteElement}>Delete</p>
          </div>
          }
          {element.type === "text" && 
          <div className="orderElement">
            <p>{element.value}</p>
            <p className="orderNumber">{element.order}</p>
            </div>
          }
        </div>
      ))}

      {!elements && 
        <div>Loading image...</div>
      }
    </div>
  )
}

export default Order