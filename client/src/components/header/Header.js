import React, { useState } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import { Avatar } from '@mui/material'
import { useGlobalContext } from '../../context'
import { Link } from "react-router-dom"
import { categories, currentUser } from '../../dummyData'
import Sidebar from './Sidebar'

const Header = () => {
    const { openSidebar } = useGlobalContext();
    return (
        <header>
            <div style={{color:"white", background:"var(--clr-primary)", padding:5}}>
                <div className='nav-center'>
                    <div className='nav-header'>
                        <a className='nav-toggle'>
                            <IconButton onClick={openSidebar}>
                                <MenuIcon style={{color: "white"}}/>
                            </IconButton>
                        </a>
                        <a href="/">
                            <h2>BookStore</h2>
                        </a>
                        <a className='nav-toggle'> 
                            <IconButton href="/profile">
                                <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
                            </IconButton>
                            <IconButton href="/cart">
                                <ShoppingCartIcon sx={{ width: 30, height: 30 }} style={{color: "white"}} />
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
                        <a className='search-btn'>Search</a>
                    </div>
                    <a className='cart-toggle' href="/profile">
                        <IconButton>
                            <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
                        </IconButton>
                    </a>
                    <a className='cart-toggle' href="/cart">
                        <IconButton>
                            <ShoppingCartIcon sx={{ width: 30, height: 30 }} style={{color: "white"}} />
                        </IconButton>
                    </a>
                </div>
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
                                    <a href={`/products`}>{cate}</a>
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