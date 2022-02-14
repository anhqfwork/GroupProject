import React, { useState, useEffect } from 'react'
import './newEmployee.css'
import { Publish } from '@material-ui/icons'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function NewEmployee() {
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
        addEmployee()
    }

    const addEmployee = async () => {
        const newEmployee = {
            username,
            name,
            password,
            email,
            confirmedPassword,
        }
        console.log(newEmployee)
        const res = await axios
            .post('api/auth/employee/signup', newEmployee)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Create Employee Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='newEmployee'>
            <div className='newEmployee'>
                <h1 className='newEmployeeTitle'>New Employee</h1>
                <form action='' className='newEmployeeForm'>
                    <div className='newEmployeeItem'>
                        <label htmlFor=''>Username</label>
                        <input
                            type='text'
                            placeholder='anhqq'
                            onChange={changeUsername}
                        />
                    </div>
                    <div className='newEmployeeItem'>
                        <label htmlFor=''>Full Name</label>
                        <input
                            type='text'
                            placeholder='John Smith'
                            onChange={changeName}
                        />
                    </div>
                    <div className='newEmployeeItem'>
                        <label htmlFor=''>Email</label>
                        <input
                            type='text'
                            placeholder='john@gmail.com'
                            onChange={changeEmail}
                        />
                    </div>
                    <div className='newEmployeeItem'>
                        <label htmlFor=''>Password</label>
                        <input
                            type='text'
                            placeholder='password'
                            onChange={changePassword}
                        />
                    </div>
                    <div className='newEmployeeItem'>
                        <label htmlFor=''>Confirmed Password</label>
                        <input
                            type='text'
                            placeholder='password'
                            onChange={changeConfirmedPassword}
                        />
                    </div>
                </form>
                <button className='newEmployeeButton' onClick={() => handleSubmit()}>Create</button>
            </div>
        </div>
    )
}

export default NewEmployee
