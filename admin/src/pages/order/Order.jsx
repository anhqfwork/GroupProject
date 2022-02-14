import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './order.css'
import { DataGrid } from '@material-ui/data-grid'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Order() {
    const [user, setUser] = useState()
    const [orderItems, setOrderItems] = useState([])

    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [status, setStatus] = useState()
    const [shippingAddress, setShippingAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [totalPrice, setTotalPrice] = useState()

    const [order, setOrder] = useState()
    const { orderId } = useParams()

    const getOrder = async () => {
        const res = await axios
            .get(`api/order/${orderId}`)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            const order = res.data.order
            setOrder(order)
            setOrderItems(order.orderItems)
            setPaymentMethod(order.paymentMethod)
            setStatus(order.status)
            setTotalPrice(order.price)

            setUser(order.user)
            setUsername(order.user.username)
            setName(order.user.name)
            setShippingAddress(order.shippingAddress)
            setPhoneNumber(order.user.phoneNumber)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const changeShippingAddress = (e) => {
        setShippingAddress(e.target.value)
    }

    const changeTotalPrice = (e) => {
        setTotalPrice(e.target.value)
    }

    const changePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const changeStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleSubmit = async () => {
        const newUser = {
            ...user,
            name,
            username,
            phoneNumber,
            shippingAddress,
        }

        const newOrder = {
            ...order,
            user: newUser,
            paymentMethod,
            totalPrice,
            status,
            shippingAddress,
        }
        const res = await axios
            .put(`api/order/${orderId}`, newOrder)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Update Order Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: true,
            renderCell: (params) => {
                return <div>{params.row.product.title}</div>
            },
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
            renderCell: (params) => {
                return <div>{params.row.product.price}</div>
            },
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 150,
            editable: true,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <img
                            src={params.row.product.image}
                            alt=''
                            className='orderListImg'
                        />
                    </>
                )
            },
        },
    ]

    return (
        <div className='order'>
            <h1 className='orderTitle'>Order</h1>
            <div className='topContent'>
                <form action='' className='orderForm'>
                    <div className='orderItem'>
                        <label className='itemTitle'>Username:</label>
                        <input
                            type='text'
                            value={username || ''}
                            onChange={changeUsername}
                            disabled
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Name:</label>
                        <input
                            type='text'
                            value={name || ''}
                            onChange={changeName}
                            disabled
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Phone Number:</label>
                        <input
                            type='text'
                            value={phoneNumber || ''}
                            onChange={changePhoneNumber}
                            disabled
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Payment Method:</label>
                        <input
                            type='text'
                            value={paymentMethod || ''}
                            onChange={changePaymentMethod}
                            disabled
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Address:</label>
                        <input
                            type='text'
                            value={shippingAddress || ''}
                            onChange={changeShippingAddress}
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Total Price:</label>
                        <input
                            type='text'
                            value={totalPrice || ''}
                            onChange={changeTotalPrice}
                            disabled
                        />
                    </div>
                    <div className='orderItem'>
                        <label className='itemTitle'>Status:</label>
                        <select onChange={changeStatus}>
                            <option value='Pending'>Pending</option>
                            <option value='Waiting'>Waiting to delivery</option>
                            <option value='Delivering'>Delivering</option>
                            <option value='Complete'>Complete</option>
                            <option value='Decline'>Decline</option>
                        </select>
                    </div>
                </form>
            </div>
            <div style={{ height: 250 }} className='bottomContent'>
                <DataGrid
                    getRowId={(orderItems) => orderItems.product._id}
                    rows={orderItems}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={3}
                    rowsPerPageOptions={[3]}
                />
            </div>
            <button
                className='updateOrderButton'
                onClick={() => handleSubmit()}
            >
                Update
            </button>
        </div>
    )
}

export default Order
