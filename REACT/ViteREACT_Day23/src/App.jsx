import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
   const say = "my name is gopal " // this the js 
  return (// so at line no 9 we have evaluation experesion and it is important to memorize this as evaluation experesion( basically means final outcome )
 <>
 <h1>Hello guys , {say}
 </h1>
 </>
  )
}

export default App
