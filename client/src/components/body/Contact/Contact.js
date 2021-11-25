import React from 'react'
import './Contact.css'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import phone from "../../../Image/phone.png";
import mail from "../../../Image/mail.png";
import location from "../../../Image/location.png";
import facebook from "../../../Image/facebook.png";


function contact() {
    return (
        <><div className="contactus-container">
            <div className="contact-contaier">
                <h3 name="contactus"><span>Contact Us</span></h3>
                <h2 name="bookstore"><span>BookStore</span></h2>
            </div>
            <div className="contactlist-links">
                <div className="contactlist-wrapper">
                    <div className="contactlist-items">
                        <h3>Address</h3>
                        <span>18 Hoang Quoc Viet, Cau Giay District, Hanoi</span>
                    </div>
                    <div className="contactlist-items">
                        <h3>Email</h3>
                        <span>officeusth@usth.edu.vn</span>
                    </div>
                    <div className="contactlist-items">
                        <h3>Phone Number</h3>
                        <span>+84-24 37 91 69 60</span>
                    </div>
                </div>
            </div>
        </div>
            <div>
                <iframe className="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.645246689171!2d105.79815151533232!3d21.04687599253463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b5f358169%3A0x90bc69ef0ad4355d!2zMTggSG_DoG5nIFF14buRYyBWaeG7h3QsIE5naMSpYSDEkMO0LCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637502459268!5m2!1svi!2s" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div></>

    )
}

export default contact