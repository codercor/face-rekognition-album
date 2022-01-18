import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Home from './views/Home'
import Event from './views/Event'

import Navbar from './components/Navbar'
import { Box } from '@mui/material'

export default function App() {
  return (
    <Box >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/event/:event" element={<Event/>} />
      </Routes>
    </Box>
  )
}
