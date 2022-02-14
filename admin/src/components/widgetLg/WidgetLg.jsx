import React, { useState, useEffect } from 'react'
import './widgetLg.css'
import { axios } from '../../axios'
import { Link } from 'react-router-dom'

export default function WidgetLg() {
    const Button = ({ type }) => {
        return <button className={'widgetLgButton ' + type}>{type}</button>
    }

    const [orders, setOrders] = useState([])

    const getAllOrders = async () => {
        const res = await axios
            .get('api/order')
            .catch((err) => console.log(err))
        if (res && res.data) {
            const listOf5 = res.data.orders.slice(-5).reverse()
            setOrders(listOf5)
        }
    }

    useEffect(() => {
      getAllOrders()
    }, [])

    const Order = (order) => {
        return (
            <tr className='widgetLgTr'>
                <td className='widgetLgUser'>
                    <img
                        src={order.user.avatar}
                        alt=''
                        className='widgetLgImg'
                    />
                    <span className='widgetLgName'>{order.user.email}</span>
                </td>
                <td className='widgetLgDate'>{order.createdAt}</td>
                <td className='widgetLgAmount'>{order.price}</td>
                <td className='widgetLgStatus'>
                    <Button type={order.status} />
                </td>
            </tr>
        )
    }
    return (
        <div className='widgetLg'>
            <h3 className='widgetLgTitle'>Latest transactions</h3>
            <table className='widgetLgTable'>
                <tr className='widgetLgTr'>
                    <th className='widgetLgTh'>Custormer</th>
                    <th className='widgetLgTh'>Date</th>
                    <th className='widgetLgTh'>Amount</th>
                    <th className='widgetLgTh'>Status</th>
                </tr>
                {orders.map((order) => {
                  return <Order key={order._id} {...order}></Order>
                })}
            </table>
        </div>
    )
}
