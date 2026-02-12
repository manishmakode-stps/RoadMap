import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterContextProvider, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx' 

const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
          <Route index element ={<Home/>} />
          <Route path='about' element={<About/>}/>
          <Route path='contact' element={<Contact/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
