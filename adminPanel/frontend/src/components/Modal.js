const Modal = ({getLength, setType, type, element, setElementContent, isLoading, upload, setUpload, 
    editing, 
    setTopText, 
    setUpdateContent, 
    setBottomText, 
    setUpdateDuration, 
    updateElement, 
    topText, 
    updateContent, 
    bottomText, 
    updateDuration, 
    resetUpdateStates,
    setEditing

}) => {

    const closeUpload = () => {
        setUpload(false)
    }
    const closeEditing = () => {
        setEditing(false)
    }

    return(
        <>


        {upload &&
        <>
        <div className="blur" onClick={() => closeUpload()}>
        <div className="uploadContainer" onClick={(e) => e.stopPropagation()}>
            <form className="upload" onSubmit={(e) => {
                setUpload(false)
                getLength(e)
                }}>
            <div className="uploadFormTitle">Upload to the Info Screen</div>
            <label>Choose a type: </label>
            <select name="type" id="type" onChange={(e) => setType(e.target.value)}>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select><br/><br/>
            <label>Insert content: </label><br></br>
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
            <button className="cancel" onClick={() => setUpload(false)}>Close</button>
            </form>

        </div>
        </div>
        </>
        }

        {editing && 
        <>
        <div className="blur" onClick={() => closeEditing()}>
        <div className="uploadContainer" onClick={(e) => e.stopPropagation()}>
            <div className="upload">
                <div className="uploadFormTitle">Editing element</div>
                <div className="field"><p className="fieldName">Type: </p>Text</div>
                <div className="field"><p className="fieldName">Top text: </p></div>
                <input className="editInput" maxLength="100" defaultValue={editing.topText} onChange={(e) => setTopText(e.target.value)}></input>
                <div className="field"><p className="fieldName">Body text: </p></div>
                <input className="editInput" defaultValue={editing.value} onChange={(e) => setUpdateContent(e.target.value)}></input>
                <div className="field"><p className="fieldName">Bottom text: </p></div>
                <input className="editInput" maxLength="100" defaultValue={editing.bottomText} onChange={(e) => setBottomText(e.target.value)}></input>
                <div className="field"><p className="fieldName">Duration: </p>
                    <input className="duration" defaultValue={editing.duration / 1000} type="number" onChange={(e) => setUpdateDuration(e.target.value * 1000)}>
                </input> seconds</div>
                <button className="save" disabled={isLoading} onClick={() => {
                    updateElement({id: editing, topText, value: updateContent, bottomText, duration: updateDuration })
                }}>Save</button>
                <button className="cancel" disabled={isLoading} onClick={() => {
                    resetUpdateStates()
                    setEditing(false)
                }}>Cancel</button>
            </div>
        </div>
        </div>
        </>
        }


        </>
    )
}

export default Modal