import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from "../pages/Home"

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
