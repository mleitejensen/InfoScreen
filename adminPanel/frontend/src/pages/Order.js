import { useState, useEffect } from "react"
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
      const response = await fetch('http://10.12.6.97/order');
      let data = await response.json();
      setElements(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getLength = (e) => {
    e.preventDefault()
    console.log(e.target)
    //e.target.reset()
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
    const response = await fetch('http://10.12.6.97/order/create', {
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
        const response = await fetch('http://10.12.6.97/order/delete', {
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
          await fetch("http://10.12.6.97/order/update", {
            method: "PATCH",
            headers:  { 'Content-Type': 'application/json', },
            body: JSON.stringify({id, type, value, duration, order, topText, bottomText})
          })
      }catch(error){
        console.log(error)
      }finally{
        makeAPICall()
        resetUpdateStates()
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
    setEditing(null)
    setTopText(null)
    setUpdateContent(null)
    setBottomText(null)
    setUpdateDuration(null)
  })

  const playerReady = ((e) => {
    setDuration(e.target.getDuration() * 1000)
    setCheckDuration(false)
  })

  const checkVideoId = () => {
    try{
      let validId = elementContent.split("?v=")[1].split("&")[0]
      return validId
    }catch(error){
      setError("Invalid Youtube video URL")
      setCheckDuration(false)
      setIsLoading(false)
    }
  }

  const updateDurationPlayer = async (e) => {
    let ytLength = await e.target.getDuration() * 1000
    const {id, type, value, order, topText, bottomText} = updateYTDuration
    updateElement({id, type, value, order, duration: ytLength, topText, bottomText})
    setUpdateYTDuration(false)
  }

  const updateOrder = async (id, direction) => {
    try{
      await fetch("http://10.12.6.97/order/update/index", {
        method: "PATCH",
        headers:  { 'Content-Type': 'application/json', },
        body: JSON.stringify({id, direction})
      })
    }catch(error){
      setError(error)
      console.log(error)
    }finally{
      makeAPICall()
    }
  }

  return (
    <div className="order">
      <div className="uploadAndInfoContainer">
        <form className="upload" onSubmit={getLength}>
          <div className="uploadFormTitle">Upload to the Info Screen</div>
          <label>Choose a type: </label>
          <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select><br/><br/>
          <label for="content">Insert content: </label><br></br>
          {type === "text" && 
            <textarea cols={45} rows={4} maxLength="100" placeholder="write anything..." name="content" required={true} reset="true" onChange={(e) => setElementContent(e.target.value)}></textarea>
          }
          {type === "image" && 
            <input type="text" placeholder="google.com/d3423431..." name="content" required={true} reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
          }
          {type === "video" && 
            <input type="text" placeholder="youtube.com/..." name="content" required={true} reset="true" onChange={(e) => setElementContent(e.target.value)}></input>
          }        
          <br/><br/>
          <button disabled={isLoading}>Upload</button>
        </form>

        <div className="info">
          
          <h1 className="uploadFormTitle">How to upload</h1>
          <p>First choose a type in the box to the left, either text, image or video.</p>

          <p>If you chose text, write anything you want to show up on the info screen.</p>
          <p>
            If you chose image, find an image on the internett and copy the image address into the input field 
            &#40; make sure its the image address and not the website address	&#41;.
          </p>
          <p>
            If you chose video, find a video on youtube and copy the URL into the input field.
          </p>

          <p>After choosing a type and filling in the input field, click the upload button or press enter.</p>


        </div>

      </div>
      {error && <div className="error">{error}</div>}
      {result && <div className="result">{result}</div>}


      <h2 className="orderTitle">Order of elements on info screen</h2>
      <div className="cardContainer">
        {elements && elements.map((element) => (
          <div className="elementCard" key={element._id}>
            {element.type === "text" ?  // TEXT TYPE
              <>
              {editing === element._id ? // if editing TEXT TYPE
                <>
                <div><p className="fieldName">Type: </p>Text</div>
                <p className="fieldName">Top text: </p>
                <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
                <p className="fieldName">Body text: </p>
                <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
                <p className="fieldName">Bottom text: </p>
                <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                <div><p className="fieldName">Duration: </p>
                  <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
                </input> seconds</div>
                <p className="orderNumber">{element.order}/{elements.length}</p>
                <button className="save" disabled={isLoading} onClick={() => {
                    updateElement({id: editing, topText, value: updateContent, bottomText, duration: updateDuration })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                  resetUpdateStates()
                }}>Cancel</button>
                </>
              :     //  if not editing TEXT TYPE
                <>
                {element.order > 1 && <button className="leftArrow" onClick={() => {updateOrder(element._id, "down")}}>&#8592;</button>}
                {element.order < elements.length && <button className="rightArrow" onClick={() => {updateOrder(element._id, "up")}}>&#8594;</button>}
                <div><p className="fieldName">Type: </p>Text</div>
                {element.topText && <p><p className="fieldName">Top Text: </p>{element.topText}</p>}
                <div><p className="fieldName">Body Text: </p>{element.value}</div>
                {element.bottomText && <p><p className="fieldName">Bottom Text: </p>{element.bottomText}</p>}
                <div><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
                <p className="orderNumber">{element.order}/{elements.length}</p>
                <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
                <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
                </>
              }

              </>
            : element.type === "image" ? // IMAGE TYPE
              <>
              {editing === element._id ? // if editing IMAGE TYPE
              <>
              <div><p className="fieldName">Type: </p>Image</div>
              <p className="fieldName">Top text: </p>
              <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
              <p className="fieldName">Image URL: </p>
              <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
              <p className="fieldName">Bottom text: </p>
              <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
              <div><p className="fieldName">Duration: </p>
                <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
              </input> seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="save" disabled={isLoading} onClick={() => {
                  updateElement({id: editing, topText, value: updateContent, bottomText, duration: updateDuration })
              }}>Save</button>
              <button className="cancel" disabled={isLoading} onClick={() => {
                resetUpdateStates()
              }}>Cancel</button>
              </>
              : // if not editing IMAGE TYPE
              <>
              {element.order > 1 && <button className="leftArrow" onClick={() => {updateOrder(element._id, "down")}}>&#8592;</button>}
              {element.order < elements.length && <button className="rightArrow" onClick={() => {updateOrder(element._id, "up")}}>&#8594;</button>}
              <div><p className="fieldName">Type: </p>Image</div>
              {element.topText && <p><p className="fieldName">Top Text: </p>{element.topText}</p>}
              <p className="fieldName">Image: </p>
              <img className="elementImage" alt={"Image from index " + element.order} src={element.value}></img>
              {element.bottomText && <p><p className="fieldName">Bottom Text: </p>{element.bottomText}</p>}
              <div><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
              <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
              </>
              }

                
              </>
            : element.type === "video" ? // VIDEO TYPE
              <>
              {editing === element._id ? // if editing VIDEO TYPE
              <>
              <div><p className="fieldName">Type: </p>Video</div>
              <p className="fieldName">Top text: </p>
              <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
              <p className="fieldName">Youtube Video URL: </p>
              <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
              <p className="fieldName">Bottom text: </p>
              <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
              <div><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="save" disabled={isLoading} onClick={() => {
                  updateElement({id: editing, topText, value: updateContent, bottomText, duration: 0 })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                  setEditing(null)
                  resetUpdateStates()
                }}>Cancel</button>
              </>
              : // if not editing VIDOE TYPE
              <>
              {element.order > 1 && <button className="leftArrow" onClick={() => {updateOrder(element._id, "down")}}>&#8592;</button>}
              {element.order < elements.length && <button className="rightArrow" onClick={() => {updateOrder(element._id, "up")}}>&#8594;</button>}
              <div><p className="fieldName">Type: </p>Video</div>
              {element.topText && <p><p className="fieldName">Top Text: </p>{element.topText}</p>}
              <p className="fieldName">Video: </p>
                <YouTube className="elementVideo"
                  videoId={element.value.split("?v=")[1].split("&")[0]} 
                  opts={{height: "162px", width: "288px"}}
                />
              {element.bottomText && <p><p className="fieldName">Bottom Text: </p>{element.bottomText}</p>}
              <div><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
              <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
              </>
              }
                
              </>
            : <>Unknown Element</> // if type is unknown
          
            }
          </div>
        ))}
      </div>

      {checkDuration && 
        <YouTube
          videoId={checkVideoId()}
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