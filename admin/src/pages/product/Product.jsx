import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './product.css'
import Chart from '../../components/chart/Chart'
import { productData } from '../../dummyData'
import { Publish } from '@material-ui/icons'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Product() {
    const [avatar, setAvatar] = useState()
    const [title, setTitle] = useState()
    const [authorName, setAuthorName] = useState()
    const [category, setCategory] = useState()
    const [publisher, setPublisher] = useState()
    const [isbn, setIsbn] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [inStock, setInStock] = useState()

    const { productId } = useParams()

    const getProduct = async () => {
        const res = await axios
            .get(`api/product/${productId}`)
            .catch((err) => console.log(err))
        if (res && res.data) {
            const product = res.data.product
            setAvatar(product.image)
            setTitle(product.title)
            setAuthorName(product.authorName)
            setCategory(product.category)
            setPublisher(product.publisher)
            setIsbn(product.isbn)
            setDescription(product.description)
            setPrice(product.price)
            setInStock(product.inStock) 
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setAvatar(reader.result)
        }
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeAuthorName = (e) => {
        setAuthorName(e.target.value)
    }

    const changeCategory = (e) => {
        setCategory(e.target.value)
    }

    const changePublisher = (e) => {
        setPublisher(e.target.value)
    }

    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const changeInStock = (e) => {
        setInStock(e.target.value)
    }

    const changeIsbn = (e) => {
        setIsbn(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmitFile = () => {
        if (!avatar) return
        console.log('uploading')
        uploadImage(avatar)
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        const res = await axios
            .post('api/upload', { data: base64EncodedImage })
            .catch((err) => console.log(err))
        if (res && res.data) {
            updateProduct(res.data.url)
        }
    }

    const updateProduct = async (imageURL) => {
        const newProduct = {
            image: imageURL,
            title,
            authorName,
            publisher,
            price,
            category,
            isbn,
            inStock,
            description,
        }
        const res = await axios
            .put(`api/product/${productId}`, newProduct)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Update Product Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='product'>
            <div className='productTitleContainer'>
                <h1 className='productTitle'>Product</h1>
            </div>
            <div className='productTop'>
                {/* <div className='productTopLeft'>
                    <Chart
                        data={productData}
                        dataKey='Sales'
                        title='Sales Performance'
                    />
                </div> */}
                <div className='productTopRight'>
                    <div className='productInfoTop'>
                        <img
                            src={avatar || ''}
                            alt=''
                            className='productInfoImg'
                        />
                        <span className='productName'>{title || ''}</span>
                    </div>
                    <div className='productInfoBottom'>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Author:</span>
                            <span className='productInfoValue'>
                                {authorName || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Price:</span>
                            <span className='productInfoValue'>
                                {price || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Publisher:</span>
                            <span className='productInfoValue'>
                                {publisher || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Category:</span>
                            <span className='productInfoValue'>
                                {category || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Isbn:</span>
                            <span className='productInfoValue'>
                                {isbn || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>In stock:</span>
                            <span className='productInfoValue'>
                                {inStock || ''}
                            </span>
                        </div>
                        <div className='productInfoItem'>
                            <span className='productInfoKey'>Description:</span>
                            <span className='productInfoValue'>
                                {description || ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='productBottom'>
                <form action='' className='productForm'>
                    <div className='productFormLeft'>
                        <label htmlFor=''>Title</label>
                        <input
                            type='text'
                            onChange={changeTitle}
                            value={title || ''}
                        />
                        <label htmlFor=''>Category</label>
                        <input
                            type='text'
                            onChange={changeCategory}
                            value={category || ''}
                        />
                        <label htmlFor=''>Publisher</label>
                        <input
                            type='text'
                            onChange={changePublisher}
                            value={publisher || ''}
                        />
                        <label htmlFor=''>Price</label>
                        <input
                            type='text'
                            onChange={changePrice}
                            value={price || ''}
                        />
                        <label htmlFor=''>In Stock</label>
                        <input
                            type='text'
                            onChange={changeInStock}
                            value={inStock || ''}
                        />
                        <label htmlFor=''>Isbn</label>
                        <input
                            type='text'
                            onChange={changeIsbn}
                            value={isbn || ''}
                        />
                        <label htmlFor=''>Author</label>
                        <input
                            type='text'
                            onChange={changeAuthorName}
                            value={authorName || ''}
                        />
                        <label htmlFor=''>Description</label>
                        <input
                            type='text'
                            onChange={changeDescription}
                            value={description || ''}
                        />
                    </div>
                    <div className='productFormRight'>
                        <div className='productUpload'>
                            {avatar && (
                                <img
                                    src={avatar}
                                    alt=''
                                    className='productUploadImg'
                                />
                            )}
                            <label htmlFor='file'>
                                <Publish className='productUploadIcon' />
                            </label>
                            <input
                                type='file'
                                id='file'
                                style={{ display: 'none' }}
                                name='image'
                                onChange={changeAvatar}
                            />
                        </div>
                    </div>
                </form>
                <button
                    className='productButton'
                    onClick={() => handleSubmitFile()}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default Product
