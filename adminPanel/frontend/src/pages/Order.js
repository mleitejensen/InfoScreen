import { useState, useEffect} from "react"
import YouTube from "react-youtube"

const Order = () => {
  const [elements, setElements] = useState()
  const [elementContent, setElementContent] = useState('')
  const [type, setType] = useState('text')
  const [duration, setDuration] = useState(null)
  const [checkDuration, setCheckDuration] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
      makeAPICall()
  }, [])

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:9000/order');
      let data = await response.json();
      setElements(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getLength = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    if(type === "video"){
      setCheckDuration(true)
      //setDuration(10000)
    } else{
      setDuration(3000)
    }
  }

  useEffect(() => {
    if(duration){
      console.log(duration)
      createElement()
    }
  }, [duration])

  const createElement = async () => {
    const response = await fetch('http://localhost:9000/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ type, value: elementContent, duration })
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
    setDuration(null)
    makeAPICall()
  }

  const deleteElement = async (id) => {
    console.log(id)
    try{ 
        await fetch('http://localhost:9000/order/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({id: id })
      })
      makeAPICall()
    }catch(error){
      console.log(error)
    }

  }

  const playerReady = ((e) => {
    console.log("player is ready")
    console.log(e.target.getDuration() * 1000)
    setDuration(e.target.getDuration() * 1000)
    setCheckDuration(false)
  })

  const opts = {
    height: '0',
    width: "0"
  };

  return (
    <div className="order">
      <form onSubmit={getLength}>
        <div className="formTitle">Upload something to show on the info panel</div>
        <label>Choose a type:</label>
        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select><br />
        <label>Write content</label><br />
        {type === "text" && 
          <input type="text" placeholder="write anything..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }
        {type === "image" && 
          <input type="text" placeholder="google.com/d3423431..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }
        {type === "video" && 
          <input type="text" placeholder="youtube.com/..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }        

        <button disabled={isLoading}>Upload</button>
      </form>
      {error && <div className="error">{error}</div>}
      {result && <div className="result">{result}</div>}
      <br /><br />


      <h2>Order of elements on info screen</h2>
      {elements && elements.map((element) => (
        <div className="elementPreview" key={element._id}>
          {element.type === "text" && 
          <div className="orderElement">
            <p>Type: Text</p>
            <input className="orderNumberInput" value={element.order} type="number"></input>
            <p>{element.value}</p>
            <p>Duration: {element.duration / 1000} seconds</p>
            <p className="orderNumber">{element.order}/{elements.length}</p>
            <button onClick={() => {deleteElement(element._id)}}>Delete</button>
            </div>
          }
          {element.type === "image" && 
          <div className="orderElement">
            <p>Type: Image</p>
            <input className="orderNumberInput" value={element.order} type="number"></input>
            <img src={element.value} alt="Incorrect url" width="100" height="100"></img>
            <p>Duration: {element.duration / 1000} seconds</p>
            <p className="orderNumber">{element.order}/{elements.length}</p>
            <button onClick={() => {deleteElement(element._id)}}>Delete</button>
          </div>
          }
          {element.type === "video" && 
          <div className="orderElement">
            <p>Type: Video</p>
            <input className="orderNumberInput" value={element.order} type="number"></input>
            <YouTube videoId={element.value.split("?v=")[1].split("&")[0]}/>
            <p>Duration: {element.duration / 1000} seconds</p>
            <p className="orderNumber">{element.order}/{elements.length}</p>
            <button onClick={() => {deleteElement(element._id)}}>Delete</button>
            
            </div>
          }
        </div>
      ))}

      {checkDuration && 
        <YouTube
        videoId={elementContent.split("?v=")[1].split("&")[0]}
        opts={opts}
        onReady={playerReady}
      />
      }

      {!elements && 
        <div>Loading image...</div>
      }
    </div>
  )
}

export default Order