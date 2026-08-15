import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from "react-router"
import {Homepage} from './pages/homepage'
import ActionsPage from './pages/ActionsPage'
import ObjectsPage from './pages/ListObjectsPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="Categories" element={ <ObjectsPage model_name='categories'/>}/>
        <Route path="Tags" element={<ObjectsPage model_name='tags'/>}/>
        <Route path="Tasks" element={<ObjectsPage model_name='tasks'/>}/>
        <Route path="Activities" element={<ObjectsPage model_name='activities'/>}/>
        <Route path="Actions" element={<ActionsPage/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
      </Routes>
      
    </>
  )
}

export default App
