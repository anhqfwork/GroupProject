import { axios } from '../../axios'
import React, { useState, useEffect } from 'react'
import './featuredInfo.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

export default function FeaturedInfo() {
    const [revenue, setRevenue] = useState([])
    const [lastRevenue, setLastRevenue] = useState([])
    const [bookSold, setBookSold] = useState([])
    const [lastBookSold, setLastBookSold] = useState([])

    const getRevenue = async () => {
        const res = await axios
            .get('api/order/getRevenue')
            .catch((err) => console.log(err))
        if (res && res.data) {
            setRevenue(res.data.revenue.totalAmount)
            setLastRevenue(res.data.lastRevenue.totalAmount)
        }
    }

    const getBookSold = async () => {
        const res = await axios
            .get('api/order/getBookSold')
            .catch((err) => console.log(err))
        if (res && res.data) {
            setBookSold(res.data.bookSold.totalQuantity)
            setLastBookSold(res.data.lastBookSold.totalQuantity)
        }
    }

    useEffect(() => {
        getRevenue()
        getBookSold()
    }, [])

    return (
        <div className='featured'>
            <div className='featuredItem'>
                <span className='featuredTitle'>Revenue</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>{revenue}</span>
                </div>
                <span className='featuredSub'>Last month: {lastRevenue}</span>
            </div>
            <div className='featuredItem'>
                <span className='featuredTitle'>Books Sold</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>{bookSold}</span>
                </div>
                <span className='featuredSub'> Last month: {lastBookSold}</span>
            </div>
        </div>
    )
}
