import { useState, useEffect } from "react"
import YouTube from "react-youtube"
import Modal from "../components/Modal"

const Order = () => {
  const [upload, setUpload] = useState(null)
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
    setEditing(element)
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
      await fetch("http://localhost:9000/order/update/index", {
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

  const SetType = (e) => {
    setType(e)
  }

  const SetElementContent = (e) => {
    setElementContent(e)
  }

  const SetUpload = (e) => {
    setUpload(e)
  }

  const SetTopText = (e) => {
    setTopText(e)
  }

  const SetBottomText = (e) => {
    setBottomText(e)
  }

  const SetUpdateContent = (e) => {
    setUpdateContent(e)
  }
  const SetUpdateDuration = (e) => {
    setUpdateDuration(e)
  }

  const SetEditing = (e) => {
    setEditing(e)
  }


  return (
    <div className="order">

      <div className="info">
        <h1>Upload to the Info Screen</h1>
        <p>Here you can upload text, pictures and youtube videos. <br></br> Want to try? Click the upload button below</p>
        <button onClick={() => {setType("text"); setUpload(true);}}>Upload</button>
      </div>
      {upload && 
      <>
        <Modal
          getLength={getLength}
          setType={SetType}
          type={type}
          setElementContent={SetElementContent}
          isLoading={isLoading}
          upload={upload}
          setUpload={SetUpload}
        ></Modal>
      </>
      }

      {editing && 
        <Modal
          editing={editing}
          setEditing={SetEditing}
          setTopText={SetTopText}
          setUpdateContent={SetUpdateContent}
          setBottomText={SetBottomText}
          setUpdateDuration={SetUpdateDuration}
          updateElement={updateElement}
          topText={topText}
          updateContent={updateContent}
          bottomText={bottomText}
          updateDuration={updateDuration}
          resetUpdateStates={resetUpdateStates}
        ></Modal>
      }

      {error && <div className="error">{error}</div>}
      {result && <div className="result">{result}</div>}


      <h2 className="orderTitle">Order of elements on info screen</h2>
      <div className="cardContainer">
        {elements && elements.map((element) => (
          <div className="elementCard" key={element._id}>
            {element.type === "text" ?  // TEXT TYPE
              <>
              {editing?._id === element._id ? // if editing TEXT TYPE
                <>
                <div className="field"><p className="fieldName">Type: </p>Text</div>
                <div className="field"><p className="fieldName">Top text: </p></div>
                <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
                <div className="field"><p className="fieldName">Body text: </p></div>
                <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
                <div className="field"><p className="fieldName">Bottom text: </p></div>
                <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                <div className="field"><p className="fieldName">Duration: </p>
                  <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
                </input> seconds</div>
                <p className="orderNumber">{element.order}/{elements.length}</p>
                <button className="save" disabled={isLoading} onClick={() => {
                    updateElement({id: editing._id, topText, value: updateContent, bottomText, duration: updateDuration })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                  resetUpdateStates()
                }}>Cancel</button>
                </>
              :     //  if not editing TEXT TYPE
                <>
                {element.order > 1 && <button className="leftArrow" onClick={() => {updateOrder(element._id, "down")}}>&#8592;</button>}
                {element.order < elements.length && <button className="rightArrow" onClick={() => {updateOrder(element._id, "up")}}>&#8594;</button>}
                <div className="field"><p className="fieldName">Type: </p>Text</div>
                {element.topText && <div className="field"><p className="fieldName">Top Text: </p>{element.topText}</div>}
                <div className="field"><p className="fieldName">Body Text: </p>{element.value}</div>
                {element.bottomText && <div className="field"><p className="fieldName">Bottom Text: </p>{element.bottomText}</div>}
                <div className="field"><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
                <p className="orderNumber">{element.order}/{elements.length}</p>
                <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
                <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
                </>
              }

              </>
            : element.type === "image" ? // IMAGE TYPE
              <>
              {editing?._id === element._id ? // if editing IMAGE TYPE
              <>
              <div className="field"><p className="fieldName">Type: </p>Image</div>
              <div className="field"><p className="fieldName">Top text: </p></div>
              <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
              <div className="field"><p className="fieldName">Image URL: </p></div>
              <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
              <div className="field"><p className="fieldName">Bottom text: </p></div>
              <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
              <div className="field"><p className="fieldName">Duration: </p>
                <input className="duration" defaultValue={element.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
              </input> seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="save" disabled={isLoading} onClick={() => {
                  updateElement({id: editing._id, topText, value: updateContent, bottomText, duration: updateDuration })
              }}>Save</button>
              <button className="cancel" disabled={isLoading} onClick={() => {
                resetUpdateStates()
              }}>Cancel</button>
              </>
              : // if not editing IMAGE TYPE
              <>
              {element.order > 1 && <button className="leftArrow" onClick={() => {updateOrder(element._id, "down")}}>&#8592;</button>}
              {element.order < elements.length && <button className="rightArrow" onClick={() => {updateOrder(element._id, "up")}}>&#8594;</button>}
              <div className="field"><p className="fieldName">Type: </p>Image</div>
              {element.topText && <div className="field"><p className="fieldName">Top Text: </p>{element.topText}</div>}
              <div className="field"><p className="fieldName">Image: </p></div>
              <img className="elementImage" alt={"Image from index " + element.order} src={element.value}></img>
              {element.bottomText && <div className="field"><p className="fieldName">Bottom Text: </p>{element.bottomText}</div>}
              <div className="field"><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="delete" disabled={isLoading} onClick={() => {deleteElement(element._id)}}>Delete</button>
              <button className="edit" disabled={isLoading} onClick={() => {startEditing(element)}}>Edit</button>
              </>
              }

                
              </>
            : element.type === "video" ? // VIDEO TYPE
              <>
              {editing?._id === element._id ? // if editing VIDEO TYPE
              <>
              <div className="field"><p className="fieldName">Type: </p>Video</div>
              <div className="field"><p className="fieldName">Top text: </p></div>
              <input className="editInput" maxLength="100" defaultValue={element.topText} onChange={(e) => setTopText(e.target.value)}></input>
              <div className="field"><p className="fieldName">Youtube Video URL: </p></div>
              <input className="editInput" defaultValue={element.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
              <div className="field"><p className="fieldName">Bottom text: </p></div>
              <input className="editInput" maxLength="100" defaultValue={element.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
              <div className="field"><p className="fieldName">Duration: </p>{element.duration / 1000} seconds</div>
              <p className="orderNumber">{element.order}/{elements.length}</p>
              <button className="save" disabled={isLoading} onClick={() => {
                  updateElement({id: editing._id, topText, value: updateContent, bottomText, duration: 0 })
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
              <div className="field"><p className="fieldName">Type: </p>Video</div>
              {element.topText && <div className="field"><p className="fieldName">Top Text: </p>{element.topText}</div>}
              <div className="field"><p className="fieldName">Video: </p></div>
                <YouTube className="elementVideo"
                  videoId={element.value.split("?v=")[1].split("&")[0]} 
                  opts={{height: "162px", width: "288px"}}
                />
              {element.bottomText && <div className="field"><p className="fieldName">Bottom Text: </p>{element.bottomText}</div>}
              <div className="field"><p className="fieldName">Duration: </p>{element.duration / 1000} Seconds</div>
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