import React from 'react'
import {currentUser} from "../../dummyData"
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import IconButton from '@mui/material/IconButton'
// import { FaTimes, FaHome, FaBook, FaFacebook, FaTwitter, FaInstagramSquare, FaPinterest } from 'react-icons/fa'
import { useGlobalContext } from '../../context'

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext();

    return (
        <aside className={`${isSidebarOpen?'sidebar show-sidebar':'sidebar'}`}>
            <div className='sidebar-header'>
                <h3>{currentUser.name}</h3>
                <button className='close-btn' onClick={closeSidebar}><CloseIcon /></button>
            </div>
            <ul className='links'>
                <li>
                    <a href='/'><HomeIcon /><span>Home</span></a>
                </li>
                <li>
                    <a href='/products'><MenuBookIcon /><span>Products</span></a>
                </li>
                <li>
                    <a href='/about'><InfoIcon /><span>About</span></a>
                </li>
                <li>
                    <a href='/contact'><ContactPageIcon /><span>Contact</span></a>
                </li>
            </ul>
            <ul className='social-icons'>
                <li>
                    <a href="https://www.facebook.com/"><IconButton><FacebookIcon color="primary"/></IconButton></a>
                    <a href="https://twitter.com/"><IconButton><TwitterIcon color="primary"/></IconButton></a>
                    <a href="https://www.instagram.com/"><IconButton><InstagramIcon color="primary"/></IconButton></a>
                    <a href="https://www.pinterest.com/"><IconButton><PinterestIcon color="primary"/></IconButton></a>
                </li>
            </ul>

        </aside>
    )
}

export default Sidebar