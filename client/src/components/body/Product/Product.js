import { Button, Rating, ButtonGroup } from '@mui/material'
import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currentUser, product, relatedProducts } from '../../../dummyData'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import './Product.css'

const Product = () => {
    const [count, setCount] = React.useState(1);

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
    return (
        <div>
            <div className='book-container'>
                <img src={product.img} alt={product.title} />
                <div className='book-info'>
                    <p style={{margin:0}}>
                    <span className='book-data'>author :</span> {product.author}
                    </p>
                    <h1>{product.title}</h1>
                    <Rating name="read-only" value={product.rating} readOnly sx={{float:'left'}} size="small"/>
                    <h4>Sold {product.inDelivered} products</h4>
                    <h2>${product.price}</h2>
                    <p>
                    <span className='book-data'>category :</span> {product.category}
                    </p>
                    <p>
                    <span className='book-data'>publisher :</span> {product.publisher}
                    </p>
                    <p>Deliver to: {currentUser.address}</p>
                    <div style={{float:'left', marginBottom:5}}>Quantity:</div>
                    <ButtonGroup style={{float:'left', width:'100%', marginBottom:20}}>
                        <Button
                            aria-label="reduce"
                            onClick={() => {
                            setCount(Math.max(count - 1, 1));
                            }}
                            sx={{width:30, height:40}}
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <input type="text" value={count} className="input-num" />
                        <Button
                            aria-label="increase"
                            onClick={() => {
                            setCount(Math.min(count + 1, product.inStock));
                            }}
                            sx={{width:30, height:40}}
                        >
                            <AddIcon fontSize="small" />
                        </Button>
                        <span style={{margin:5, color:'grey'}}>(There are 10 products in stock)</span>
                    </ButtonGroup>
                    
                    <Button variant="contained" color="error" className="add-btn" sx={{width:300, height:50}}>Add To Cart</Button>
                </div>
            </div>
            <div className="slide-center">
                <div className="slider-container">
                    <h3>Related products</h3>
                    <Slider {...settings} responsive={responsive} className="slider">
                        {relatedProducts.map((book) => {
                        return (
                        <div className="slide">
                            <a href="/product">
                                <img src={book.img} alt={book.title}/>
                                <h4>{book.title}</h4>
                                <p>${book.price}</p>
                            </a>
                        </div>
                        )
                        })}
                    </Slider>
                </div>
            </div>
            <div className='description'>
                <h3>description</h3>
                <p>{product.description}</p>
            </div>
            <div className='rating'>
                <h3>rating</h3>
                <Rating name="read-only" value={product.rating} readOnly/>
            </div>
        </div>
    )
}

export default Product