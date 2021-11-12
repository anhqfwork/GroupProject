import React, {useState, useEffect} from 'react'
import './Home.css'
import { Carousel } from 'react-carousel-minimal';
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import {newestProducts, products} from '../../../dummyData'
import { imgSlide } from '../../../dummyData'

const Home = () => {
    const Book = (book) => {
        return (
            <li className='product_item'>
                <a className='cover_container'>
                    <img src={book.img} alt="" width="180" height="260"/>
                    <div className='cover'><IconButton className='icon'><SearchIcon /></IconButton></div>
                </a>
                <h3>{book.title}</h3>
                <h4>{book.price}</h4>
            </li>
        );
    };
    return (
        <div>
            <div style={{ textAlign: "center", padding: "0 20px" }}>
                <Carousel
                    data={imgSlide}
                    time={5000}
                    width="850px"
                    height="500px"
                    caption={false}
                    captionStyle={{display:'none'}}
                    radius="10px"
                    slideNumber={false}
                    captionPosition="bottom"
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
                    maxWidth: "850px",
                    maxHeight: "500px",
                    margin: "30px auto",
                    }}
                />
            </div>
            <div className='title_center'>
                <h4>this month's</h4>
                <h2>new arrivals</h2>
            </div>
            <ul className='product_center'>
                {newestProducts.map((book) => {
                    return (
                        <Book key={book._id} {...book}></Book>
                    )
                })}
            </ul>
            <div className='title_center'>
                <h4>book shop publishers</h4>
                <h2>all products</h2>
            </div>
            <ul className='product_center'>
                {products.map((book) => {
                    return (
                        <Book key={book._id} {...book}></Book>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home