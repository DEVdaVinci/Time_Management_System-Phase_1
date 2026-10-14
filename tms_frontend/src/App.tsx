import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route, useParams } from "react-router"
import {Homepage} from './pages/homepage'
import ActionsPage from './pages/ActionsPage'
import ObjectsPage from './pages/ListObjectsPage'
import CreatePage from './pages/CreateObjectsPageTest'
import UpdatePage from './pages/UpdateObjectsPageTest'
import ReadPage from './pages/ReadObjectsPageTest'
import DeletePage from './pages/DeleteObjectsPageTest'
import LoginPage from './pages/LoginPage'
import axios from './utils/axiosConfig'


export function LoginRoute() {

  const { pageType } = useParams()

  return <LoginPage pageType={pageType}/>

}

export function ListObjectsRoute() {
  const { model_name } = useParams()

  return <ObjectsPage model_name={model_name}/>

}

export function CreateObjectsRoute() {
  const { model_name } = useParams()

  return <CreatePage model_name={model_name}/>

}

export function ReadObjectsRoute() {
  const { model_name } = useParams()
  const { id } = useParams()

  return <ReadPage model_name={model_name} id={id}/>

}

export function UpdateObjectsRoute() {
  const { model_name } = useParams()
  const { id } = useParams()

  return <UpdatePage model_name={model_name} id={id}/>

}

export function DeleteObjectsRoute() {
  const { model_name } = useParams()
  const { id } = useParams()

  return <DeletePage model_name={model_name} id={id}/>

}

function App() {
   useEffect(() => {
        axios.get("http://localhost:8000/api/csrf/");
    }, []);

  return (
    <>
      <Routes>
        <Route index element={ <LoginPage pageType={"login"}/> }/>
        <Route path="home" element={ <Homepage/>}/>
        <Route path="auth/:pageType" element={ <LoginRoute/>}/>
        <Route path="list/:model_name" element={ <ListObjectsRoute/>}/>
        <Route path="create/:model_name" element={ <CreateObjectsRoute/>}/>
        <Route path="read/:model_name/:id" element={ <ReadObjectsRoute/>}/>
        <Route path="edit/:model_name/:id" element={ <UpdateObjectsRoute/>}/>
        <Route path="delete/:model_name/:id" element={ <DeleteObjectsRoute/>}/>
        <Route path="*" element={<div>Page Not Found!!!!!!</div>}/>
      </Routes>
      
    </>
  )
}

export default App
