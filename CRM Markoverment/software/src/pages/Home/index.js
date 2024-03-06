import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Index() {
    return (
        <>
            {/* <Routes> */}
                <Header />
                <main>
                    <Routes path='/*'>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
                <Footer />
            {/* </Routes> */}
        </>
    )
}
