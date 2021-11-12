import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import phone from "../../Image/phone.png";
import mail from "../../Image/mail.png";
import location from "../../Image/location.png";
import facebook from "../../Image/facebook.png";
import twitter from "../../Image/twitter.png";
import  youtube from "../../Image/youtube.png";

function Footer() {
  return (
    <div className="footer-container">
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
    </div>
  );
}

export default Footer