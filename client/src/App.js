import {currentUser} from "./dummyData"
import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/header/Header"
import Home from "./components/body/Home/Home"
import Footer from "./components/footer/Footer"
import Products from "./components/body/Products/Products"
import Profile from "./components/profile/profile"
import Contact from "./components/contact/contact"

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route element={<Home />} exact path="/">
                </Route>
                <Route element={<Products />} path="/products">
                </Route>
                <Route element={<Profile />} path="/profile">
                </Route>
                <Route element={<Contact />} path="/contact"></Route>
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
