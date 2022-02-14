import React, { useState, useEffect } from 'react'
import './Products.css'
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
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { axios } from '../../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Products = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [publishers, setPublishers] = useState([])

    const getAllProducts = async () => {
        const res = await axios
            .get('api/product')
            .catch((err) => console.log(err))

        if (res && res.data) {
            setProducts(res.data.products)
        }
    }

    const getCategories = async () => {
        const res = await axios.get('api/category').catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data.categories)
            setCategories(res.data.categories)
        }
    }

    const getProductsByCategory = async (category) => {
        console.log(category)
        const res = await axios
            .post('api/product/productByCategory', { category: category })
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            setProducts(res.data.product)
        }
    }

    const getAllPublishers = async () => {
        const res = await axios.get('api/product/getAllPublishers').catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data.publishers)
            setPublishers(res.data.publishers)
        }
    }
    
    const selectPublisher = async (e) => {
        const publisher = e.target.value
        const res = await axios.post('api/product/filterProduct', {
            publisher, priceLarger: 0, priceSmaller: 100000000
        }).catch((err) => console.log(err))
        if (res && res.data) {
            setProducts(res.data.product)
        }
    }

    useEffect(() => {
        getAllProducts()
        getCategories()
        getAllPublishers()
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
                <Button variant='contained' href={`/products/${book._id}`}>see details</Button>

            </li>
        )
    }

    return (
        <div>
            <div className='breadcrumb'>
                <Breadcrumbs aria-label='breadcrumb'>
                    <Link
                        underline='hover'
                        color='inherit'
                        href='/'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                        Home
                    </Link>
                    <Typography
                        color='text.primary'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <MenuBookIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                        Products
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className='p_center'>
                <div className='filter'>
                    <div className='categories'>
                        <div className='side_header'>Categories</div>
                        <ul>
                            {categories.map((category) => {
                                return (
                                    <ListItemButton
                                        onClick={() =>
                                            getProductsByCategory(category.name)
                                        }
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='publishers'>
                        <div className='side_header'>Publishers</div>
                        <FormGroup>
                            <RadioGroup>
                                {publishers.map((publisher) => {
                                    return (
                                        <FormControlLabel
                                            value={publisher}
                                            control={<Radio />}
                                            label={publisher}
                                            name='publisher'
                                            onChange={selectPublisher}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormGroup>
                    </div>
                </div>
                <ul className='product_center'>
                    {products.map((book) => {
                        return <Book key={book._id} {...book}></Book>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Products
