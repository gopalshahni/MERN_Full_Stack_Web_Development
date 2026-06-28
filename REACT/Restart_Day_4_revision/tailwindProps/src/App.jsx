import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card.jsx'
export default function App() {
  let myarr = [1,2,3,4]
  return (
  <>
  <h1 className="text-3xl bg-amber-800 underline font-monoblack-800 rounded-3xl">Hello world!</h1>
  <Card channelName='chaiaurcode ' somearr={myarr}/>
  <Card/>
  </>
  )
}
