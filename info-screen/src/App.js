import { useEffect, useState } from 'react';
import './App.css';
import YouTube from "react-youtube"

function App() {
  const [elements, setElements] = useState(null)
  const [currentElement, setCurrentElement] = useState(null)
  const [index, setIndex] = useState(-1)
  const [videoLength, setVideoLength] = useState(null)
  const maxElements = 10

  

  
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

 
 useEffect(() => {
     makeAPICall()
     changeCurrentElement(index)
     //Implementing the setInterval method
     const timer = setInterval(() => {
       if(index < ((elements?.length === undefined)? maxElements : elements.length)){
         setIndex(index + 1);
       } else{
         setIndex(0);
       }
       
     }, currentElement?.type === "video" ? videoLength + "000" : 3000);

     return () => clearInterval(timer);
   }, [index]);

   const changeCurrentElement = async (i) => {
     try{
       setCurrentElement(elements[i])
     }catch(error){
       //console.log(error)
     }
   }

  const playerReady = (e) => {
  console.log(currentElement?.type === "video" ? videoLength + "000" : 3000)
  const duration = e.target.getDuration();
  setVideoLength(duration)
  console.log("duration: " + duration)
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
