import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import {Routes,Route} from "react-router-dom"


import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route path="/chat" element={<ChatPage/>}></Route>
      </Routes>
    </div>
    
    
  )
}

export default App
