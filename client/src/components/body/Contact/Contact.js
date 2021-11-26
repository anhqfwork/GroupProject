import React from 'react'
import './Contact.css'
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton } from '@mui/material';


function contact() {
    return (
        <div className="contactus-container">
            <h3 className="contactus">Contact Us</h3>
            <div className="contact-container">
                <div className="contactlist-wrapper">
                    <div className="contactlist-items">
                        <h4><IconButton color="primary" href="https://www.google.com/maps/place/18B+Ho%C3%A0ng+Qu%E1%BB%91c+Vi%E1%BB%87t,+Ngh%C4%A9a+%C4%90%C3%B4,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vietnam/@21.0464781,105.8000449,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab31c7ad04ff:0x8f85621b80682d05!8m2!3d21.0464731!4d105.8022389"><LocationOnIcon/></IconButton>Address</h4>
                        <p>18 Hoang Quoc Viet, Cau Giay District, Hanoi</p>
                    </div>
                    <div className="contactlist-items">
                        <h4><IconButton color="primary"><MailIcon /></IconButton>Email</h4>
                        <p>officeusth@usth.edu.vn</p>
                    </div>
                    <div className="contactlist-items">
                        <h4><IconButton color="primary"><PhoneIcon /></IconButton>Phone Number</h4>
                        <p>+84-24 37 91 69 60</p>
                    </div>
                    <div className="contactlist-items">
                        <h4><IconButton color="primary" href="https://www.facebook.com/usth.edu.vn"><FacebookRoundedIcon/></IconButton>Facebook</h4>
                        <p>https://www.facebook.com/usth.edu.vn</p>
                    </div>
                    <div className="contactlist-items">
                        <h4><IconButton color="primary" href="https://www.instagram.com/usth_official"><InstagramIcon/></IconButton>Instagram</h4>
                        <p>https://www.instagram.com/usth_official</p>
                    </div>
                    <div className="contactlist-items">
                        <h4><IconButton color="primary" href="https://www.youtube.com/channel/UCqc5GUt4MW5ScbV7XqUWhiQ"><YouTubeIcon/></IconButton>YouTube</h4>
                        <p>ĐH Khoa học và Công nghệ Hà Nội -USTH</p>
                    </div>
                </div>
                <div>
                    <iframe className="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.645246689171!2d105.79815151533232!3d21.04687599253463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b5f358169%3A0x90bc69ef0ad4355d!2zMTggSG_DoG5nIFF14buRYyBWaeG7h3QsIE5naMSpYSDEkMO0LCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637502459268!5m2!1svi!2s" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default contact