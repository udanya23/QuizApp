import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './components/Quiz.jsx'
import Home from './components/Home.jsx'
import Result from './components/Result.jsx'

export default function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path='/result' element={<Result/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}
