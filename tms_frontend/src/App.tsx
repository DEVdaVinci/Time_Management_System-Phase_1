import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from "react-router"
import {Homepage} from './pages/homepage'

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="Categories" element={<div>Categories Page</div>}/>
        <Route path="Tags" element={<div>Tags Page</div>}/>
        <Route path="Tasks" element={<div>Tasks Page</div>}/>
        <Route path="Activities" element={<div>Activities Page</div>}/>
        <Route path="Actions" element={<div>Actions Page</div>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
        
      </Routes>
      
    </>
  )
}

export default App
