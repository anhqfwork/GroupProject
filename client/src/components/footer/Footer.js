import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import phone from "../../Image/phone.png";
import mail from "../../Image/mail.png";
import location from "../../Image/location.png";
import facebook from "../../Image/facebook.png";
import twitter from "../../Image/twitter.png";
import  youtube from "../../Image/youtube.png";
import { IconButton } from '@mui/material';

function Footer() {
  return (
    <footer>
      <div className="bottom_border">
        <div className="footer-center">
          <div style={{textAlign:'left', width:'50%'}}>
              <h5>Find us</h5>
              <p>USTH, A21 Bulding, Vietnam Academy of Science and Technology</p>
              <p><IconButton color="primary"><LocationOnIcon /></IconButton> 18 Hoang Quoc Viet, Cau Giay District, Hanoi </p>
              <p><IconButton color="primary"><PhoneIcon /></IconButton> +84-24 37 91 69 60 </p>
              <p><IconButton color="primary"><MailIcon /></IconButton> officeusth@usth.edu.vn </p>
          </div>
          <div style={{textAlign:'left'}}>
              <h5>Help</h5>
              <ul className="footer_ul">
                  <li><a href="/">Store Location</a></li>
                  <li><a href="/">Privacy Policy</a></li>
                  <li><a href="/">Hollow Man Montage</a></li>
                  <li><a href="/">Ebay & Amazon</a></li>
                  <li><a href="/">Shipping Information</a></li>
                  <li><a href="/">Orders & Returns</a></li>
              </ul>
          </div>
          <div style={{textAlign:'left'}}>
              <h5>Support</h5>
              <ul className="footer_ul">
                  <li><a href='/'>Home</a></li>
                  <li><a href='/about'>About us</a></li>
                  <li><a href='/contact'>Contact</a></li>
                  <li><a href='/products'>Products</a></li>
                  <li><a href='/login'>Login & Register</a></li>
              </ul>
          </div>
        </div>
      </div>
      <div>
        <ul className="footer_bottom_ul">
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/contact'>Contact</a></li>
          <li><a href='/products'>Products</a></li>
          <li><a href='/login'>Login</a></li>
        </ul>
        <p style={{textAlign:'center'}}>Copyright @2021 | Designed by <a href="/" className='bookstore'>BookStore</a></p>
        <ul className="footer_bottom_ul">
          <li>
            <a href='https://www.facebook.com/'>
                <IconButton color="primary"><FacebookRoundedIcon /></IconButton>
            </a>
            <a href='https://twitter.com/'>
                <IconButton color="primary"><TwitterIcon /></IconButton>
            </a>
            <a href='https://www.instagram.com/'>
                <IconButton color="primary"><InstagramIcon /></IconButton>
            </a>
            <a href='https://www.youtube.com/'>
                <IconButton color="primary"><YouTubeIcon /></IconButton>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="footer-container">
        <div class="footer-links">
          <div className="footer-link-wrapper">
            <div class="footer-link-items">
              <h2>ABOUT</h2>
              <h5>Bookstore</h5>
            </div>
            <div class="footer-link-items">
              <h2>FIND US</h2>
              <Link to="/">
                <img className="footer-icon" src={phone} /> 123456789
              </Link>
              <Link to="/">
                <img className="footer-icon" src={mail} /> bookstore@gmail.com
              </Link>
              <Link to="/">
                <img className="footer-icon" src={location} /> Hà Nội
              </Link>
            </div>
            <div class="footer-link-items">
              <h2>SIGN UP FOR EMAIL</h2>
              <form>
                <input className='footer-input' name='email' type='email' placeholder='Enter Email Address'/> 
                <button className='btn-mobile'>SIGN UP</button>
              </form>
            </div>
            <div class="footer-link-items">
            <h2>FOLLOW US</h2>
              <div class="footer-link-social-icons">
                <Link to="/">
                  <img className="social-icons" src={facebook} /> 
                </Link><Link to="/">
                  <img className="social-icons" src={twitter} /> 
                </Link><Link to="/">
                  <img className="social-icons" src={youtube} /> 
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section class="rights">
          <div>
            <small class="website-rights">
              Copyright © 2021 Bookstore. All rights reserved.
            </small>
          </div>
        </section>
      </div> */}
    </footer>
  );
}

export default Footer