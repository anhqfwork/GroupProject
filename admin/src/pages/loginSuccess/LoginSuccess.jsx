import React from 'react'
import { Link } from 'react-router-dom'
import './loginSuccess.css'

export default function LoginSuccess() {
    return (
        <div className='success-text'>
            <div className='text'>Login Successfully</div>
            <div>
                <Link to='/'>
                    <button>Home</button>
                </Link>
            </div>
        </div>
    )
}