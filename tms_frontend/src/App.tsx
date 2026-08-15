import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import {Homepage} from './pages/homepage'
import ActionsPage from './pages/ActionsPage'
import ObjectsPage from './pages/ListObjectsPage'


export function ListObjectsRoute() {
  const { model_name } = useParams()

  return <ObjectsPage model_name={model_name}/>

}

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="list/:model_name" element={ <ListObjectsRoute/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
      </Routes>
      
    </>
  )
}

export default App
