import React, { useState } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import { useGlobalContext } from '../../context'
import { Link } from "react-router-dom"
import { categories } from '../../dummyData'
import Sidebar from './Sidebar'
import SearchIcon from '@mui/icons-material/Search'

const Header = () => {
    const { openSidebar } = useGlobalContext();
    return (
        <header>
            <div className='nav-center'>
                <div className='nav-header'>
                    <a className='nav-toggle'>
                        <IconButton onClick={openSidebar}>
                            <MenuIcon />
                        </IconButton>
                    </a>
                    <h2>BookStore</h2>   
                    <a className='nav-toggle' href="/cart">                 
                        <IconButton>
                            <ShoppingCartIcon />
                        </IconButton>
                    </a>
                    <Sidebar />
                </div>
                <div className='search-center'>
                    <input 
                        className='search-bar'
                        type='text'
                        placeholder='Find product, category or publisher you want...'
                    />
                    <a className='search-btn'><SearchIcon />Search</a>
                </div>
                <a className='cart-toggle' href="/cart">
                    <IconButton>
                        <ShoppingCartIcon />
                    </IconButton>
                </a>
            </div>
            <div className='nav-container'>
                <div className='nav-bar'>
                    <a href="/" className='navlink'>
                    Home
                    </a>
                    <div className='dropdown'>
                        <a href="/products" className='navlink'>
                        Products
                        </a>
                        <div className='dropdown-contents'>
                            {categories.map((cate) => {
                                return (
                                    <a href={`/products/${cate}`}>{cate}</a>
                                )
                            })}
                        </div>
                    </div>
                    <a href="/about" className='navlink'>
                    About
                    </a>
                    <a href="/contact" className='navlink'>
                    Contact
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header