import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import {Homepage} from './pages/homepage'
import ActionsPage from './pages/ActionsPage'
import ObjectsPage from './pages/ListObjectsPage'
import CreatePage from './pages/CreateObjectsPageTest'


export function ListObjectsRoute() {
  const { model_name } = useParams()

  return <ObjectsPage model_name={model_name}/>

}

export function CreateObjectsRoute() {
  const { model_name } = useParams()

  return <CreatePage model_name={model_name}/>

}

function App() {
  

  return (
    <>
      <Routes>
        <Route index element={ <Homepage/> }/>
        <Route path="list/:model_name" element={ <ListObjectsRoute/>}/>
        <Route path="create/:model_name" element={ <CreateObjectsRoute/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
      </Routes>
      
    </>
  )
}

export default App
