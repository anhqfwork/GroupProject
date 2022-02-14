import React from 'react'
import './Forbidden.css'
import { Link } from 'react-router-dom'

export default function Forbidden() {
    return (
        <div className='forbidden'>
            <span>You do not have the right to perform this!</span>
        </div>
    )
}
