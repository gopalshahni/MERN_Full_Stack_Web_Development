import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(5) // the useState return array of list first is a variable then next is a function 
  
  const addValue = () =>
     { 
      if(count < 20 ){
     console.log('value added ')
    setCount(count + 5 )
      } else {
      }
      alert('limit is 20 ')
      
  } ;

  const remValue = () =>
     { 
    console.log('value removed ')
    if(count > 0){
      setCount(count -5)
    }
    else {
      alert('please do not click it ')
    }
    
  } ;
  return (
    <>
    <h1>chai aur react</h1>
    <h2> counter value  {count}</h2>
    <button onClick={addValue} >Add value 5</button><br></br>
    <button onClick={remValue} >sub value 5 </button>
    </>
  )
}

export default App
