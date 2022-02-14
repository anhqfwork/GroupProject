import {
    Button,
    Rating,
    ButtonGroup,
    Breadcrumbs,
    Typography,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ImageList,
    ImageListItem,
    Grid,
    Stack,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { currentUser, relatedProducts, reviews } from '../../../dummyData'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import HomeIcon from '@mui/icons-material/Home'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone'
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone'
import AssignmentReturnTwoToneIcon from '@mui/icons-material/AssignmentReturnTwoTone'
import './Product.css'
import { axios } from '../../../axios'
import { addProduct } from '../../../redux/cartRedux'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

const Product = () => {
    const [product, setProduct] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])
    const dispatch = useDispatch()
    const { id } = useParams()

    let user
    const currentUser = useSelector((state) => state.user.currentUser)
    if (currentUser) {
        user = currentUser.result
    }

    const getProduct = async () => {
        const res = await axios
            .get(`/api/product/${id}`)
            .catch((err) => console.log(err))
        if (res && res.data) {
            setProduct(res.data.product)
        }
    }

    const getRelatedProducts = async () => {
        const res = await axios
            .get('api/product/func/getFiveNewestProducts')
            .catch((err) => console.log(err))
        if (res && res.data) {
            setRelatedProducts(res.data.product)
        }
    }

    useEffect(() => {
        getProduct()
        getRelatedProducts()
    }, [])

    const [quantity, setQuantity] = React.useState(1)
    const handleClick = async () => {
        const res = await axios.post('api/cart/addToCart', {
            productId: id,
            quantity,
        })
        if (res && res.data) {
            console.log(res.data)
            dispatch(addProduct({ item: { product, quantity }, quantity }))
            toast.success('Add To Cart Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
    }
    const responsive = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ]
    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
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
                    <Link
                        underline='hover'
                        color='inherit'
                        href='/'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <MenuBookIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                        Products
                    </Link>
                    <Typography color='text.primary'>
                        {product.title}
                    </Typography>
                </Breadcrumbs>
            </div>
            <div className='book-container'>
                <img src={product.image} alt={product.title} />
                <div className='book-info'>
                    <p style={{ margin: 0 }}>
                        Author :{' '}
                        <span className='book-data'>{product.author}</span>
                    </p>
                    <h1>{product.title}</h1>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid var(--clr-grey-light)',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name='read-only'
                            value={product.rating}
                            readOnly
                            sx={{ float: 'left' }}
                            size='small'
                        />
                        <h4>(Sold {product.inDelivered} products)</h4>
                    </div>
                    <Grid container spacing={0}>
                        <Grid item xs={8}>
                            <h2>{product.price} VND</h2>
                            <p>
                                Category :{' '}
                                <span className='book-data'>
                                    {product.category}
                                </span>
                            </p>
                            <p>
                                Publisher :{' '}
                                <span className='book-data'>
                                    {product.publisher}
                                </span>
                            </p>
                            <p>Quantity:</p>
                            <ButtonGroup
                                style={{
                                    float: 'left',
                                    width: '100%',
                                    marginBottom: 10,
                                }}
                            >
                                <Button
                                    aria-label='reduce'
                                    onClick={() => {
                                        setQuantity(Math.max(quantity - 1, 1))
                                    }}
                                    sx={{ width: 30, height: 40 }}
                                >
                                    <RemoveIcon fontSize='small' />
                                </Button>
                                <input
                                    type='text'
                                    value={quantity}
                                    className='input-num'
                                />
                                <Button
                                    aria-label='increase'
                                    onClick={() => {
                                        setQuantity(
                                            Math.min(
                                                quantity + 1,
                                                product.inStock
                                            )
                                        )
                                    }}
                                    sx={{ width: 30, height: 40 }}
                                >
                                    <AddIcon fontSize='small' />
                                </Button>
                            </ButtonGroup>
                            <Typography
                                variant='caption'
                                style={{
                                    marginBottom: 20,
                                    color: 'grey',
                                    float: 'left',
                                }}
                            >
                                (There are {product.inStock} products in stock)
                            </Typography>
                            <Button
                                variant='contained'
                                color='error'
                                className='add-btn'
                                sx={{ width: 300, height: 50 }}
                                onClick={() => {currentUser ? handleClick() : window.location = '/login'}}
                            >
                                Add To Cart
                            </Button>
                            <div style={{ margin: '20px 0', float: 'left' }}>
                                <p style={{ fontWeight: 'bold' }}>
                                    Offers for customers who order online:
                                </p>
                                <p
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleRoundedIcon
                                        fontSize='small'
                                        color='primary'
                                    />
                                    Free protective cover for all products.
                                </p>
                                <p
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleRoundedIcon
                                        fontSize='small'
                                        color='primary'
                                    />
                                    Nationwide Delivery.
                                </p>
                                <p
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleRoundedIcon
                                        fontSize='small'
                                        color='primary'
                                    />
                                    Delivery time: 3 - 7 days.
                                </p>
                            </div>
                        </Grid>
                        {currentUser ? (<Grid
                            item
                            xs={4}
                            className='information'
                            style={{ marginTop: 10 }}
                        >
                            <p style={{ fontWeight: 'bold', fontSize: 13 }}>
                                Send to:
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: 15 }}>
                                {user.name} | {user.phoneNumber}
                            </p>
                            <p style={{ fontSize: 15 }}>
                                {user.address}
                            </p>
                            <Stack
                                direction='row'
                                spacing={2}
                                sx={{ marginTop: 3 }}
                            >
                                <Stack
                                    direction='column'
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <VerifiedUserTwoToneIcon color='primary' />
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                    >
                                        Refund 100%
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction='column'
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <ThumbUpTwoToneIcon color='primary' />
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                    >
                                        Check products
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction='column'
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <AssignmentReturnTwoToneIcon color='primary' />
                                    <Typography
                                        variant='caption'
                                        color='text.secondary'
                                    >
                                        Return in 30 days
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>) : ''}
                    </Grid>
                </div>
            </div>
            <div className='slide-center'>
                <div className='slider-container' style={{ paddingTop: 0 }}>
                    <h3>Related products</h3>
                    <Slider
                        {...settings}
                        responsive={responsive}
                        className='slider'
                    >
                        {relatedProducts.map((book) => {
                            return (
                                <div className='slide'>
                                    <a href={`/products/${book._id}`}>
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                        />
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
            {/* <div className='rating'>
                <h3>rating</h3>
                <div
                    style={{
                        display: 'flex',
                        gap: 20,
                        alignItems: 'center',
                        paddingLeft: 10,
                    }}
                >
                    <Typography variant='h4'>
                        {!product.ratings || product.ratings.toFixed(1)}
                    </Typography>
                    <div>
                        <Rating
                            name='read-only'
                            value={product.ratings}
                            readOnly
                        />
                        <Typography
                            sx={{
                                color: 'var(--clr-grey)',
                                paddingLeft: 1,
                            }}
                        >
                            {reviews.length} reviews
                        </Typography>
                    </div>
                </div>
                <div>
                    {reviews.map((review) => {
                        return (
                            <List>
                                <ListItem alignItems='flex-start'>
                                    <ListItemAvatar style={{ paddingTop: 10 }}>
                                        <Avatar
                                            src={review.avatar}
                                            alt={review.name}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        style={{
                                            borderTop:
                                                '1px solid var(--clr-grey-light)',
                                            paddingTop: 10,
                                        }}
                                        primary={review.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                        gap: 2,
                                                    }}
                                                    component='span'
                                                    variant='body2'
                                                    color='text.secondary'
                                                >
                                                    <Rating
                                                        value={review.rating}
                                                        name='read-only'
                                                        readOnly
                                                    />
                                                    {labels[review.rating]}
                                                </Typography>
                                                <Typography color='text.primary'>
                                                    {review.comment}
                                                </Typography>
                                                <ImageList
                                                    sx={{
                                                        width: 'fit-content',
                                                        height: 'fit-content',
                                                        paddingTop: 1,
                                                    }}
                                                    cols={100}
                                                    rowHeight={1}
                                                >
                                                    {review.img.map((image) => {
                                                        return (
                                                            <a href={image.src}>
                                                                <img
                                                                    src={
                                                                        image.src
                                                                    }
                                                                    alt={
                                                                        image.id
                                                                    }
                                                                    className='reviewImg'
                                                                />
                                                            </a>
                                                        )
                                                    })}
                                                </ImageList>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        )
                    })}
                </div>
            </div> */}
        </div>
    )
}

export default Product
