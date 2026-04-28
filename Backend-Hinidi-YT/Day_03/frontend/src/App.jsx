import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from "axios"
import { useEffect } from 'react'
function App() {
  const [jokes,setJokes] = useState([])

    useEffect(()=>{
      axios.get('/api/jokes' )
        .then((res)=>{
          setJokes(res.data)
          console.log(res.data);
          
        }) 
        .catch((err)=>{
          console.log(err);
          
        })
    },[])
  return (
    <>
    <h1>Chai and full stack</h1>
    <p>Jokes : {jokes.length}</p>
    {
      jokes.map((joke,index) =>(
        <div key={joke.id}>
        <h3>{joke.title}</h3> 
        <p>{joke.content}</p> 
        </div>
      ))
    }

    </>
  )
}

export default App
