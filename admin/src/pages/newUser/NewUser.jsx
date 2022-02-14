import React, { useState, useEffect } from 'react'
import './newUser.css'
import { Publish } from '@material-ui/icons'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export default function NewUser() {
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [confirmedPassword, setConfirmedPassword] = useState()

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeConfirmedPassword = (e) => {
        setConfirmedPassword(e.target.value)
    }

    const handleSubmit = () => {
        addProduct()
    }

    const addProduct = async () => {
        const newUser = {
            username,
            name,
            password,
            confirmedPassword,
            email,
        }
        const res = await axios
            .post('api/auth/user/signup', newUser)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Create User Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='newUser'>
            <h1 className='newUserTitle'>New User</h1>
            <form action='' className='newUserForm'>
                <div className='newUserItem'>
                    <label htmlFor=''>Username</label>
                    <input
                        type='text'
                        placeholder='anhqq'
                        onChange={changeUsername}
                    />
                </div>
                <div className='newUserItem'>
                    <label htmlFor=''>Full Name</label>
                    <input
                        type='text'
                        placeholder='John Smith'
                        onChange={changeName}
                    />
                </div>
                <div className='newUserItem'>
                    <label htmlFor=''>Email</label>
                    <input
                        type='text'
                        placeholder='john@gmail.com'
                        onChange={changeEmail}
                    />
                </div>
                <div className='newUserItem'>
                    <label htmlFor=''>Password</label>
                    <input
                        type='text'
                        placeholder='password'
                        onChange={changePassword}
                    />
                </div>
                <div className='newUserItem'>
                    <label htmlFor=''>Confirmed Password</label>
                    <input
                        type='text'
                        placeholder='password'
                        onChange={changeConfirmedPassword}
                    />
                </div>
            </form>
            <button className='newUserButton' onClick={() => handleSubmit()}>
                Create
            </button>
        </div>
    )
}
