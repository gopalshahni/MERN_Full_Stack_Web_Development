import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
let [count,setCount] = useState(1)
  function addValue(){
    if(count>=20){
     alert("value is greater than 20");
      
    }else{
    // count = count + 1
    console.log(count,Math.random());
    setCount(count + 1)
    }
  }
  function removeValue(){
    if(count<=0){
      console.log("value is lower than positive number")
    }else{
    count = count -1
    console.log(count, Math.random());
    setCount(count)
    }
  }
  return (
    <><h1>Chai aur React</h1>
      <h2>counter value : {count}</h2>
      <button onClick={addValue}>Add value {count}</button>
      <button onClick={removeValue}>Remove value {count}</button>
     </>
  )
}

export default App
