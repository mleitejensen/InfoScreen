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
  
  const [editing, setEditing] = useState(null)
  const [topText, setTopText] = useState(null)
  const [updateContent, setUpdateContent] = useState(null)
  const [bottomText, setBottomText] = useState(null)
  const [updateDuration, setUpdateDuration] = useState(null)
  const [updateYTDuration, setUpdateYTDuration] = useState(null)

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
    e.target.reset()
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
        const response = await fetch('http://localhost:9000/order/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({id: id })
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

      makeAPICall()
    }catch(error){
      console.log(error)
    }
  }

  const updateElement = async (update) => { 
    const {id, type, value, duration, order, topText, bottomText} = update
    if(duration > 0){
      try{
          await fetch("http://localhost:9000/order/update", {
            method: "POST",
            headers:  { 'Content-Type': 'application/json', },
            body: JSON.stringify({id, type, value, duration, order, topText, bottomText})
          })
      }catch(error){
        console.log(error)
      }finally{
        makeAPICall()
        resetUpdateStates()
        setEditing(null)
      }
    }else{
      setUpdateYTDuration(update)
    }
  }



  const startEditing = ((element) => {
    setEditing(element._id)
    setTopText(element.topText)
    setUpdateContent(element.value)
    setBottomText(element.bottomText)
    setUpdateDuration(element.duration)
  })

  const resetUpdateStates = (() => {
    setTopText(null)
    setUpdateContent(null)
    setBottomText(null)
    setUpdateDuration(null)
  })

  const playerReady = ((e) => {
    setDuration(e.target.getDuration() * 1000)
    setCheckDuration(false)
  })

  const updateDurationPlayer = async (e) => {
    let ytLength = await e.target.getDuration() * 1000
    const {id, type, value, order, topText, bottomText} = updateYTDuration
    updateElement({id, type, value, order, duration: ytLength, topText, bottomText})
    setUpdateYTDuration(false)
  }

  return (
    <div className="order">
      <form className="upload" onSubmit={getLength}>
        <div className="formTitle">Upload something to show on the info panel</div>
        <label>Choose a type: </label>
        <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select><br/><br/>
        <label>Insert content: </label>
        {type === "text" && 
          <input type="text" placeholder="write anything..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }
        {type === "image" && 
          <input type="text" placeholder="google.com/d3423431..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }
        {type === "video" && 
          <input type="text" placeholder="youtube.com/..." name="content" required="true" reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
        }        
        <br/><br/>
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
              <input className="orderNumberInput" defaultValue={element.order} type="number"></input>
              {editing === element._id 
                ? // if editing
                  <>
                    <p><p className="fieldName">Type: </p>Text</p>
                    
                      <p><p className="fieldName">Top text: </p>
                      <input className="editInput" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
                      <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want top text</p></p> 
                    

                    <p><p className="fieldName">Body text: </p>
                      <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
                    </p>

                      <p><p className="fieldName">Bottom text: </p>
                      <input className="editInput" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                      <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want bottom text</p></p>
                    
                    <p><p className="fieldName">Duration: </p>
                      <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
                      </input> seconds</p>

                      <p className="orderNumber">{element.order}/{elements.length}</p>

                      <button className="save" disabled={isLoading} onClick={() => {
                          updateElement({id: editing, topText, value: updateContent, bottomText, duration: updateDuration })
                      }}>Save</button>
                      <button className="cancel" disabled={isLoading} onClick={() => {
                        setEditing(null)
                        resetUpdateStates()
                      }}>Cancel</button>
                  </>
                : // if not editing
                  <>
                    
                    <p><p className="fieldName">Type: </p>Text</p>
                    {element.topText && 
                      <p><p className="fieldName">Top text: </p>{element.topText}</p>
                    }
                    
                    <p><p className="fieldName">Body text: </p>{element.value}</p>
                    {element.bottomText && 
                      <p><p className="fieldName">Bottom text: </p>{element.bottomText}</p>
                    }
                    <p><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</p>
                    <p className="orderNumber">{element.order}/{elements.length}</p>

                    <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
                    <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
                  </>
              }
            </div>
          }
          {element.type === "image" && 
            <div className="orderElement">
              <input className="orderNumberInput" value={element.order} type="number"></input>
              {editing === element._id 
              ? // if editing
              <>
                <p><p className="fieldName">Type: </p>Image</p>

                <p><p className="fieldName">Top text: </p>
                  <input className="editInput" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
                <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want top text</p></p>

                <p><p className="fieldName">Image URL: </p>
                  <input className="editInput" defaultValue={element.value} placeholder="https://picsum.photos/" onChange={(e) => setUpdateContent(e.target.value)}></input>
                </p>

                <p><p className="fieldName">Bottom text: </p>
                <input className="editInput" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want bottom text</p></p>
                    
                <p><p className="fieldName">Duration: </p>
                <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
                </input> seconds</p>

                <p className="orderNumber">{element.order}/{elements.length}</p>

                <button className="save" disabled={isLoading} onClick={() => {
                    updateElement({id: editing, topText, value: updateContent, bottomText, duration: updateDuration })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                  setEditing(null)
                  resetUpdateStates()
                }}>Cancel</button>

              </>
              : // if not editing 
              <>
                <p><p className="fieldName">Type: </p>Image</p>

                {element.topText && 
                  <p><p className="fieldName">Top text: </p>{element.topText}</p>
                }
                <img src={element.value} alt="Incorrect url" width="100" height="100"></img>
                {element.bottomText && 
                  <p><p className="fieldName">Bottom text: </p>{element.bottomText}</p>
                }
                <p><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</p>
                <p className="orderNumber">{element.order}/{elements.length}</p>
                <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
                <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
              </>
              }
              
            </div>
          }
          {element.type === "video" && 
            <div className="orderElement">
              <input className="orderNumberInput" value={element.order} type="number"></input>
              {editing === element._id 
              ? // if editing
              <>
                <p><p className="fieldName">Type: </p>Video</p>

                <p><p className="fieldName">Top text: </p>
                  <input className="editInput" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
                <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want top text</p></p>

                <p><p className="fieldName">Youtube video URL: </p>
                  <input className="editInput" defaultValue={element.value} placeholder="youtube.com/..." onChange={(e) => setUpdateContent(e.target.value)}></input>
                </p>

                <p><p className="fieldName">Bottom text: </p>
                <input className="editInput" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                <p className="toolTip"> &lt;&lt;&lt; Leave this empty if you dont want bottom text</p></p>
                    
                <p><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</p>

                <p className="orderNumber">{element.order}/{elements.length}</p>

                <button className="save" disabled={isLoading} onClick={() => {
                  updateElement({id: editing, topText, value: updateContent, bottomText, duration: 0 })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                  setEditing(null)
                  resetUpdateStates()
                }}>Cancel</button>


              </>
              : // if not editing
              <>
              <p><p className="fieldName">Type: </p>Video</p>
              {element.topText && 
                <p><p className="fieldName">Top text: </p>{element.topText}</p>
              }

              <YouTube 
                videoId={element.value.split("?v=")[1].split("&")[0]} 
                opts={{height: "216px", width: "384px"}}
              />

              {element.bottomText && 
                <p><p className="fieldName">Bottom text: </p>{element.bottomText}</p>
              }
              <p><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</p>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
              <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
              </>
              }
            </div>
          }
        </div>
      ))}

      {checkDuration && 
        <YouTube
          videoId={elementContent.split("?v=")[1].split("&")[0]}
          opts={{height: "0", width: "0"}}
          onReady={playerReady}
        />
      }

      {updateYTDuration && 
        <YouTube
          videoId={updateYTDuration.value.split("?v=")[1].split("&")[0]}
          opts={{height: "0", width: "0"}}
          onReady={updateDurationPlayer}
        />
      }

      {!elements && 
        <div>Loading image...</div>
      }
    </div>
  )
}

export default Order