import { useEffect, useState } from 'react';
import './App.css';
import YouTube from "react-youtube"
import { ReactFitty } from "react-fitty";

function App() {
  const [elements, setElements] = useState([])
  const [currentElement, setCurrentElement] = useState(null)
  const [index, setIndex] = useState(0)
  const maxElements = 10
  
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://10.12.6.97/order',);
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
      setTimeout(() => {
        setIndex(index => index+1)
      }, currentElement.duration)
    } else if(currentElement?.type === "video" && index < ((elements?.length === undefined)? maxElements : elements.length)){
      // wait on video
    } else{
      setIndex(0);
    }
  }, [currentElement])

  useEffect(() => {
    console.log(index)
    changeCurrentElement(index)
  }, [index])

  const opts = {
    height: '1080',
    width: '1920',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      mute: 1
    }
  };

  const videoReady = async (e) => {
    setTimeout(() => {
      setIndex(index => index+1)
    }, currentElement.duration)
  }

  
  return (
    <div className="App">
      <header className="App-header">
          {currentElement &&
            <div>


            {currentElement.type === "image" && 
              <>
                {(currentElement.topText && currentElement.bottomText) 
                ? // if topText and bottomText is true
                  <div className="bottomAndTopText">
                    <ReactFitty maxSize="200px">{currentElement.topText}</ReactFitty>
                    <img src={currentElement.value} alt="current element"></img>
                    <ReactFitty maxSize="200px">{currentElement.bottomText}</ReactFitty>
                  </div>
                : // if one or both are false
                  <>
                  {(currentElement.topText && !currentElement.bottomText) &&
                    <div className="topText">
                      <ReactFitty maxSize="200px">{currentElement.topText}</ReactFitty>
                      <img src={currentElement.value} alt="current element"></img>
                    </div>
                  }
                  {(!currentElement.topText && currentElement.bottomText) &&
                    <div className="bottomText">
                      <img src={currentElement.value} alt="current element"></img>
                      <ReactFitty maxSize="200px">{currentElement.bottomText}</ReactFitty>
                    </div>
                  }
                  {(!currentElement.topText && !currentElement.bottomText) &&

                    <img src={currentElement.value} alt="current element"></img>
                  
                  }
                  </>

                }
              </>
            }


            {currentElement.type === "text" && 
              <div className="bottomAndTopText">
                <ReactFitty maxSize="200px">{currentElement.topText}</ReactFitty>
                <p><ReactFitty maxSize="600px">{currentElement.value}</ReactFitty></p>
                <ReactFitty maxSize="200px">{currentElement.bottomText}</ReactFitty>
              </div>
            }


            {currentElement.type === "video" && 

              <>
                {(currentElement.topText && currentElement.bottomText)
                ?
                  <div className="bottomAndTopText">
                    <ReactFitty maxSize="200px">{currentElement.topText}</ReactFitty>
                    <YouTube
                      videoId={currentElement.value.split("?v=")[1].split("&")[0]}
                      opts={opts}
                      onReady={videoReady}
                    />
                    <ReactFitty maxSize="200px">{currentElement.bottomText}</ReactFitty>
                  </div>
                : 
                  <>
                    {(currentElement.topText && !currentElement.bottomText) &&
                      <div className="topText">
                        <ReactFitty maxSize="200px">{currentElement.topText}</ReactFitty>
                        <YouTube
                          videoId={currentElement.value.split("?v=")[1].split("&")[0]}
                          opts={opts}
                          onReady={videoReady}
                        />
                      </div>
                    }

                    {(!currentElement.topText && currentElement.bottomText) &&
                      <div className="bottomText">
                        <YouTube
                          videoId={currentElement.value.split("?v=")[1].split("&")[0]}
                          opts={opts}
                          onReady={videoReady}
                        />
                        <ReactFitty maxSize="200px">{currentElement.bottomText}</ReactFitty>
                      </div>
                    }

                    {(!currentElement.topText && !currentElement.bottomText) &&
                      <YouTube
                        videoId={currentElement.value.split("?v=")[1].split("&")[0]}
                        opts={opts}
                        onReady={videoReady}
                      />
                    }
                  
                  </>
                }



              </>
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
