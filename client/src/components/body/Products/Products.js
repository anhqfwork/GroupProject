import React, { useState } from 'react'
import './Products.css'
import { Button, IconButton, FormGroup, FormControlLabel, ListItemButton, ListItemText, RadioGroup, Radio } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { products, categories, publishers } from '../../../dummyData';

const Products = () => {
    
    const Book = (book) => {
        return (
            <li className='product_item'>
                <a className='cover_container' href="/product">
                    <img src={book.img} alt="" width="180" height="260"/>
                    <div className='cover'><IconButton className='icon'><SearchIcon /></IconButton></div>
                </a>
                <h3>{book.title}</h3>
                <h4>{book.price}</h4>
                <Button variant="contained">Add to Cart</Button>
            </li>
        );
    };
    return (
        <div className="center">
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
                <div>
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
    )
}

export default Products