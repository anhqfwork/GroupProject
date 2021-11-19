import {currentUser} from "./dummyData"
import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/header/Header"
import Home from "./components/body/Home/Home"
import Footer from "./components/footer/Footer"
import Products from "./components/body/Products/Products"
import Cart from "./components/body/Cart/Cart"
import About from "./components/body/About/About"

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route element={<Home />} exact path="/" />
                <Route element={<Products />} path="/products" />
                <Route element={<About />} exact path="/about" />
                <Route element={<Cart />} exact path="/cart" />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
