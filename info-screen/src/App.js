import { useEffect, useState } from 'react';
import './App.css';
import YouTube from "react-youtube"

function App() {
  const [elements, setElements] = useState([])
  const [currentElement, setCurrentElement] = useState(null)
  const [index, setIndex] = useState(0)
  const [videoLength, setVideoLength] = useState(null)
  const maxElements = 10
  
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
    
  useEffect(() => {
    makeAPICall()
  }, [])
  
  const changeCurrentElement = async (i) => {
    try{
      setCurrentElement(elements[i])
    }catch(error){
      //console.log(error)
    }
  }

  useEffect(() => {
    changeCurrentElement(index)
  }, [elements]);


  useEffect(() => {
    if(currentElement?.type !== "video" && index < ((elements?.length === undefined)? maxElements : elements.length)){
      setTimeout(function(){
        setIndex(index => index+1)
      }, 3000)
    } else if(currentElement?.type === "video" && index < ((elements?.length === undefined)? maxElements : elements.length)){
      console.log(videoLength)
      console.log(videoLength === undefined ? 10000 : videoLength)
      setTimeout(function(){
        setIndex(index => index+1)
      }, 10000)
    } else{
      setIndex(0);
    }
  }, [currentElement])

  useEffect(() => {
    console.log(index)
    changeCurrentElement(index)
  }, [index])

  const playerReady = (e) => {
  //console.log(currentElement?.type === "video" ? videoLength * 1000 : 3000)
  const duration = e.target.getDuration();
  setVideoLength(duration * 1000)
  //console.log("duration: " + duration)
  }

  

  const opts = {
    height: '1080',
    width: '1920',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      mute: 1
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
          {currentElement &&
            <div>
            {currentElement.type === "image" && 
              <img src={currentElement.value} alt="current element"></img>
            }
            {currentElement.type === "text" && 
              <div>
                <p className='text'>{currentElement.value}</p>
                
              </div>
            }
            {currentElement.type === "video" && 
              <div>
                <YouTube
                  videoId={currentElement.value.split("?v=")[1].split("&")[0]}
                  opts={opts}
                  onReady={playerReady}
                />
              </div>
            }
            </div>
          }
          
          {!currentElement && 
            <p className='text'>Loading...</p>
          }
      </header>
    </div>
  );
}

export default App;
