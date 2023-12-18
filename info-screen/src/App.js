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
          <div className='image'>
            <img src={currentElement.value} alt="current element" className='center-fit'></img>
            <p>{currentElement.value}</p>
          </div>
          }
          {!currentElement && 
            <p>Loading...</p>
          }
      </header>
    </div>
  );
}

export default App;
