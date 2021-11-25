import React, {useState, useEffect} from 'react'
import './Home.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-carousel-minimal';
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import {bestSellers, newestProducts, products, publishers} from '../../../dummyData'
import { imgSlide } from '../../../dummyData'

const Home = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    const responsive = [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
    ]
    const autoSetting = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }
    const Book = (book) => {
        return (
            <div className="slide">
                <a href="/product">
                    <img src={book.img} alt={book.title}/>
                    <h4>{book.title}</h4>
                    <p>${book.price}</p>
                </a>
            </div>
        );
    };
    const Publisher = (publisher) => {
        return (
            <div className="publisher_slide">
                <a href="/products">
                    <img src={publisher.img} alt={publisher.name} />
                </a>
            </div>
        )
    }
    return (
        <div>
            <div style={{ padding: "0 20px" }}>
                <Carousel
                    data={imgSlide}
                    time={5000}
                    width="90vw"
                    height="600px"
                    caption={false}
                    captionStyle={{display:'none'}}
                    radius="10px"
                    slideNumber={false}
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="30px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    thumbnails={false}
                    ic
                    style={{
                    textAlign: "center",
                    maxWidth: "1170px",
                    maxHeight: "600px",
                    margin: "30px auto",
                    }}
                />
            </div>
            <div className="slide-center">
                <div className='title_center'>
                    <h4>this month's</h4>
                    <h2>new arrivals</h2>
                </div>
                <div className="slider-container">
                    <Slider {...settings} responsive={responsive} className="slider">
                        {newestProducts.map((book) => {
                            return (
                                <Book key={book._id} {...book}></Book>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            <div className="slide-center">
                <div className='title_center'>
                    <h4>book shop publishers</h4>
                    <h2>best sellers</h2>
                </div>
                <div className="slider-container">
                    <Slider {...settings} responsive={responsive} className="slider">
                        {bestSellers.map((book) => {
                            return (
                                <Book key={book._id} {...book}></Book>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            <div className="event">
                <div>
                    <h3>Shop wide range of collections</h3>
                    <h2>BOOK FESTIVAL</h2>
                    <p>ALL BOOKS ARE FLAT 50% OFF</p>
                </div>
            </div>
            <div className="slide-center">
                <div className='title_center'>
                    <h3>Our publishers</h3>
                </div>
                <div className="slider-container">
                    <Slider {...autoSetting} responsive={responsive} className="slider">
                        {publishers.map((publisher) => {
                            return (
                                <Publisher key={publisher.name} {...publisher}></Publisher>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Home