import React, { useState } from 'react'
import './Products.css'
import { Button, IconButton, FormGroup, FormControlLabel, ListItemButton, ListItemText, RadioGroup, Radio, Breadcrumbs, Typography, Link } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { products, categories, publishers } from '../../../dummyData';

const Products = () => {
    
    const Book = (book) => {
        return (
            <li className='product_item'>
                <a className='cover_container' href="/product">
                    <img src={book.img} alt="" width="180" height="260"/>
                    <div className='cover'><IconButton className='icon' color='primary'><SearchIcon /></IconButton></div>
                </a>
                <h3>{book.title}</h3>
                <h5>{book.author}</h5>
                <h4>${book.price}</h4>
                <Button variant="contained">add to cart</Button>
            </li>
        );
    };
    return (
        <div>
            <div className="breadcrumb">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Products
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className="p_center">
                <div className="filter">
                    <div className="categories">
                        <div className="side_header">Categories</div>
                        <ul>
                            {categories.map((category) => {
                                return (
                                    <ListItemButton>
                                        <ListItemText primary={category} />
                                    </ListItemButton>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="publishers">
                        <div className="side_header">Publishers</div>
                        <FormGroup>
                            <RadioGroup>
                                {publishers.map((publisher) => {
                                    return (
                                        <FormControlLabel value={publisher.name} control={<Radio />} label={publisher.name} />
                                    )
                                })}
                            </RadioGroup>
                        </FormGroup>
                    </div>
                    <div className="price_range">
                        <div className="side_header">Price</div>
                        <FormGroup>
                            <RadioGroup>
                                <FormControlLabel value="<10" control={<Radio />} label="Below $10" />
                                <FormControlLabel value="[10,50)" control={<Radio />} label="From $10 to $50" />
                                <FormControlLabel value="[50,100)" control={<Radio />} label="From $50 to $100" />
                            </RadioGroup>
                        </FormGroup>
                    </div>
                </div>
                <ul className='product_center'>
                    {products.map((book) => {
                        return (
                            <Book key={book._id} {...book}></Book>
                        )
                    })}
                </ul>
                
            </div>
        </div>
    )
}

export default Products