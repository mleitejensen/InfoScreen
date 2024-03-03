const Modal = ({getLength, setType, type, setElementContent, isLoading, setUpload}) => {

    const closeModal = () => {
        setUpload(false)
    }

    return(
        <>
        <div className="blur" onClick={() => closeModal()}>
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
            </form>

            <button className="Close" onClick={() => setUpload(false)}>Close</button>
        </div>
        </div>
        </>
    )
}

export default Modal