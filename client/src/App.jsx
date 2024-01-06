import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import('./App.css')
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
           <Route path = "/" element = {<Home/>}/>
           <Route path = "/dashboard" element = {<Dashboard/>}/>
           <Route path = "/login" element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
