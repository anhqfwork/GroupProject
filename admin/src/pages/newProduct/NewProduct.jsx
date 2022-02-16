import React, { useState } from 'react'
import './newProduct.css'
import { Publish } from '@material-ui/icons'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function NewProduct() {
    const [avatar, setAvatar] = useState()
    const [title, setTitle] = useState()
    const [authorName, setAuthorName] = useState()
    const [category, setCategory] = useState()
    const [publisher, setPublisher] = useState()
    const [isbn, setIsbn] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [inStock, setInStock] = useState()

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
            addProduct(res.data.url)
        }
    }

    const addProduct = async (imageURL) => {
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
        console.log(newProduct)
        const res = await axios
            .post(`api/product`, newProduct)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Create Product Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='newProduct'>
            <h1 className='addProductTitle'>New Product</h1>
            <form action='' className='addProductForm'>
                <div className='addProductItem'>
                    {avatar && (
                        <img src={avatar} alt='' className='productUploadImg' />
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
                <div className='addProductItem'>
                    <label htmlFor=''>Title</label>
                    <input
                        type='text'
                        placeholder='Sherlock Holmes'
                        onChange={changeTitle}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>Author</label>
                    <input
                        type='text'
                        placeholder='Conan Doyle'
                        onChange={changeAuthorName}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>Category</label>
                    <input
                        type='text'
                        placeholder='Boxset'
                        onChange={changeCategory}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>Publisher</label>
                    <input
                        type='text'
                        placeholder='NXB Tre'
                        onChange={changePublisher}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>Price</label>
                    <input
                        type='text'
                        placeholder='1200000'
                        onChange={changePrice}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>In Stock</label>
                    <input
                        type='text'
                        placeholder='50'
                        onChange={changeInStock}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>ISBN</label>
                    <input
                        type='text'
                        placeholder='SLH-BS'
                        onChange={changeIsbn}
                    />
                </div>
                <div className='addProductItem'>
                    <label htmlFor=''>Description</label>
                    <input
                        type='text'
                        placeholder='A very good book that everyone loves'
                        onChange={changeDescription}
                    />
                </div>
            </form>
            <button
                className='addProductButton'
                onClick={() => handleSubmitFile()}
            >
                Create
            </button>
        </div>
    )
}

export default NewProduct
