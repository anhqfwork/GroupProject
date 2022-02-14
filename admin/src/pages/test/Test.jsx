import { axios } from '../../axios'
import React, { useState, useEffect } from 'react'
import './test.css'
import { convertGridRowsPropToState } from '@material-ui/data-grid'

export default function Test() {
    const [data, setData] = useState([])

    const getData = async () => {
        const res = await axios
            .get('api/order/getRevenue')
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            // console.log(res.data.lastRevenue)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='data'>{data}</div>
    )
}

