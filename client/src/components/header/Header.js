import React, { useState } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import { useGlobalContext } from '../../context'
import { Link } from "react-router-dom"
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
                    <a className='nav-toggle'>                 
                    <IconButton>
                        <ShoppingCartIcon />
                    </IconButton></a>
                    <Sidebar />
                </div>
                <div className='search-center'>
                    <IconButton><SearchIcon /></IconButton>
                    <input 
                        className='search-bar'
                        type='text'
                        placeholder='Search'
                    />
                </div>
                <a className='cart-toggle'>
                    <IconButton>
                        <ShoppingCartIcon />
                    </IconButton>
                </a>
            </div>
            <div className='nav-container'>
                <div className='nav-bar'>
                    <a href="/">
                    Home
                    </a>
                    <a href="/products">
                    Products
                    </a>
                    <a href="/about">
                    About
                    </a>
                    <a href="/contact">
                    Contact
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header