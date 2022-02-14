import React, { useState, useEffect } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { useGlobalContext } from '../../context'
import { Link, Navigate } from 'react-router-dom'
import { categories, currentUser } from '../../dummyData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { axios } from '../../axios'
import { logoutUser } from '../../redux/userRedux'
import { deleteAllProducts } from '../../redux/cartRedux'

const Header = () => {
    const { openSidebar } = useGlobalContext()
    const quantity = useSelector((state) => state.cart.quantity)
    const dispatch = useDispatch()

    let user
    const currentUser = useSelector((state) => state.user.currentUser)
    if (currentUser) {
        user = currentUser.result
    }

    const [searchTerm, setSearchTerm] = useState([])

    const onChangeSearchBar = (e) => {
        setSearchTerm(e.target.value)
    }

    const logout = () => {
        dispatch(logoutUser())
        dispatch(deleteAllProducts())
    }

    // const user = ''
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header>
            <div
                style={{
                    color: 'white',
                    background: 'var(--clr-primary)',
                    padding: 5,
                }}
            >
                <div className='nav-center'>
                    <div className='nav-header'>
                        <a className='nav-toggle'>
                            <IconButton onClick={openSidebar}>
                                <MenuIcon style={{ color: 'white' }} />
                            </IconButton>
                        </a>
                        <a href='/'>
                            <h2>BookStore</h2>
                        </a>
                        <a className='nav-toggle'>
                            <IconButton href='/profile'>
                                <Avatar
                                    alt={user ? user.name : ''}
                                    src={user ? user.name : ''}
                                    sx={{ width: 30, height: 30 }}
                                />
                            </IconButton>
                            <IconButton href='/cart'>
                                <ShoppingCartIcon
                                    sx={{ width: 30, height: 30 }}
                                    style={{ color: 'white' }}
                                />
                            </IconButton>
                        </a>
                        {/* <a className='nav-toggle'> 
                            <IconButton onClick={handleClick}>
                                <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><a href="/profile" style={{color:"var(--clr-black)"}}>Profile</a></MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                            <IconButton href="/cart">
                                <ShoppingCartIcon sx={{ width: 30, height: 30 }} style={{color: "white"}} />
                            </IconButton>
                        </a> */}

                        <Sidebar />
                    </div>
                    <div className='search-center'>
                        <input
                            className='search-bar'
                            type='text'
                            placeholder='Find product, category or publisher you want...'
                            onChange={onChangeSearchBar}
                        />
                        <a
                            href={`/search/${searchTerm}`}
                            className='search-btn'
                        >
                            Search
                        </a>
                    </div>
                    <a
                        className='cart-toggle'
                        href={currentUser ? '/profile' : '/login'}
                    >
                        <IconButton>
                            <Avatar
                                alt={user ? user.name : ''}
                                src={user ? user.name : ''}
                                sx={{ width: 30, height: 30 }}
                            />
                            </IconButton>
                        </a>
                    {/* <a className='cart-toggle'>
                        <IconButton onClick={handleClick}>
                            <Avatar alt={currentUser.name} src={currentUser.avatar} sx={{ width: 30, height: 30 }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><a href="/profile" style={{color:"var(--clr-black)"}}>Profile</a></MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </a> */}
                    <Link
                        to={currentUser ? '/cart' : '/login'}
                        className='cart-toggle'
                    >
                        <IconButton>
                            <ShoppingCartIcon
                                sx={{ width: 30, height: 30 }}
                                style={{ color: 'white' }}
                            />
                            {/* <div>{quantity}</div> */}
                        </IconButton>
                    </Link>
                    {currentUser ? (
                        <button
                            className='btn_prim logout_btn'
                            onClick={() => logout()}
                        >
                            <Link to='/login'>Logout</Link>
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className='nav-container'>
                <div className='nav-bar'>
                    <a href='/' className='navlink'>
                        Home
                    </a>
                    <div className='dropdown'>
                        <a href='/products' className='navlink'>
                            Products
                        </a>
                        <div className='dropdown-contents'>
                            {categories.map((cate) => {
                                return <a href={`/products`}>{cate}</a>
                            })}
                        </div>
                    </div>
                    <a href='/about' className='navlink'>
                        About
                    </a>
                    <a href='/contact' className='navlink'>
                        Contact
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header
