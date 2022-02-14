import React, { useState, useEffect } from 'react'
import './SearchProducts.css'
import {
    Button,
    IconButton,
    FormGroup,
    FormControlLabel,
    ListItemButton,
    ListItemText,
    RadioGroup,
    Radio,
    Breadcrumbs,
    Typography,
    Link,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { axios } from '../../../axios'

const SearchProducts = () => {
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState([])

    const { searchTerm } = useParams()

    const getAllProducts = async () => {
        const res = await axios
            .post('api/product/searchSpecificProduct', { title: searchTerm })
            .catch((err) => console.log(err))

        if (res && res.data) {
            setProducts(res.data.product)
            setQuantity(res.data.quantity)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const Book = (book) => {
        return (
            <li className='product_item'>
                <a className='cover_container' href={`/products/${book._id}`}>
                    <img src={book.image} alt='' width='180' height='260' />
                    <div className='cover'>
                        <IconButton className='icon' color='primary'>
                            <SearchIcon />
                        </IconButton>
                    </div>
                </a>
                <h3>{book.title}</h3>
                <h5>{book.authorName}</h5>
                <h4>{book.price} VND</h4>
                <Button variant='contained' href={`/products/${book._id}`}>
                    see details
                </Button>
            </li>
        )
    }

    return (
        <div>
            <div className='search_text'>
                Found {quantity} results for '{searchTerm}'
            </div>
            <ul className='product_center'>
                {products.map((book) => {
                    return <Book key={book._id} {...book}></Book>
                })}
            </ul>
        </div>
    )
}

export default SearchProducts
