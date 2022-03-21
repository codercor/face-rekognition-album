import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './views/Home'
import Event from './views/Event'

import Admin from './views/admin'
import Uploader from './views/uploader'


import Navbar from './components/Navbar'
import { Box } from '@mui/material'


export default function App() {
  return (
    <Box >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="event/:event" element={<Event />} />
        <Route path="admin" element={<Admin.Main />} >
          <Route index element={<Admin.Events />} />
          <Route path='users' element={<Admin.Users />} />
        </Route>
        <Route path="Alogin" element={<Admin.Login />} />
        <Route path="uploader" element={<Uploader.Layout />} >
          <Route index element={<Uploader.Home />} />
        </Route>
        <Route path='Ulogin' element={<Uploader.Login />} />
      </Routes>
    </Box>
  )
}
