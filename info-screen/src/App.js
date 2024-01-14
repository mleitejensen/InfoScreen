import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [elements, setElements] = useState(null)
  const [currentElement, setCurrentElement] = useState(null)
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    makeAPICall()
    changeCurrentElement(index)
    //Implementing the setInterval method
    const timer = setInterval(() => {
      if(index < ((elements?.length === undefined)? 10 : elements.length)){
        setIndex(index + 1);
      } else{
        setIndex(0);
      }
       
    }, 6000);

    return () => clearInterval(timer);
  }, [index]);

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
  
  const changeCurrentElement = async (i) => {
    try{
      setCurrentElement(elements[i])
    }catch(error){
      console.log(error)
    }
  }

  const test = async () => {
    try {
      let YOUR_API_KEY = ""
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${currentElement.value.split("?v=")[1]}&part=contentDetails&key=${YOUR_API_KEY}`,);
      let data = await response.json();
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }
 
  test()

  
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
                <iframe width="1980" height="1080" src={"https://www.youtube.com/embed/" + currentElement.value.split("?v=")[1] + "?&autoplay=1"} frameborder="0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
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
