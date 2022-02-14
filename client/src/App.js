import {currentUser} from "./dummyData"
import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom'
import Header from "./components/header/Header"
import Home from "./components/body/Home/Home"
import Footer from "./components/footer/Footer"
import Products from "./components/body/Products/Products"
import Product from "./components/body/Product/Product"
import Cart from "./components/body/Cart/Cart"
import About from "./components/body/About/About"
import Profile from "./components/body/Profile/Profile"
import Contact from "./components/body/Contact/Contact"
import LoginForm from "./components/body/LoginForm/LoginForm"
import RegisterForm from "./components/body/RegisterForm/RegisterForm"
import SearchProducts from "./components/body/SearchProducts/SearchProducts"
import { useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Header />
            <Routes>
                <Route element={user ? <Navigate to="/" /> : <LoginForm />} exact path='/login' />
                <Route element={<RegisterForm />} exact path='/register' />
                <Route element={<RegisterForm />} exact path='/register' />
                <Route element={<Home />} exact path='/' />
                <Route element={<Products />} exact path='/products' />
                <Route path='/products'>
                    <Route path=':id' element={<Product />} />
                </Route>
                <Route path='/search'>
                    <Route path=':searchTerm' element={<SearchProducts />} />
                </Route>
                <Route element={<About />} exact path='/about' />
                <Route element={user ? <Cart /> : <Navigate to='/login' />} exact path='/cart' />
                <Route element={user ? <Profile />: <Navigate to='login' />} path='/profile' />
                <Route element={<Contact />} path='/contact'></Route>
            </Routes>
            <Footer />
        </Router>
    )
}

export default App