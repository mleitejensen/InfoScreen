import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [elements, setElements] = useState(null)
  const [currentElement, setCurrentElement] = useState(null)
  const [index, setIndex] = useState(-1)
  

  useEffect(() => {
    makeAPICall()
  }, [])

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
  
  //setIndex(i => {})

  useEffect(() => {
    changeCurrentElement(index)
    //Implementing the setInterval method
    const timer = setInterval(() => {
      if(index <= 3){
        setIndex(index + 1);
      } else{
        setIndex(0);
      }
       
    }, 3000);

    return () => clearInterval(timer);
  }, [index]);

  
  return (
    <div className="App">
      <header className="App-header">
          {currentElement &&
            <div>
            {currentElement.type === "img" && 
              <img src={currentElement.value} alt="current element" className='image'></img>
            }
            {currentElement.type === "text" && 
              <div>
                <p className='text'>{currentElement.value}</p>
                <iframe width="1920" height="1080" src="https://www.youtube.com/embed/5Peo-ivmupE?si=iY3jtIYj3Oh3ruxa&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
