import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './employee.css'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from '@material-ui/icons'
import { axios } from '../../axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Employee() {
    const [avatar, setAvatar] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    const [isAdmin, setIsAdmin] = useState()

    const { employeeId } = useParams()

    const getEmployee = async () => {
        const res = await axios
            .get(`api/employee/${employeeId}`)
            .catch((err) => console.log(err))
        if (res && res.data) {
            const employee = res.data.employee
            setAvatar(employee.avatar)
            setEmail(employee.email)
            setUsername(employee.username)
            setEmail(employee.email)
            setName(employee.name)
            setPhoneNumber(employee.phoneNumber)
            setIsAdmin(employee.isAdmin)
            setPassword(employee.password)
        }
    }

    useEffect(() => {
        getEmployee()
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

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const changeName = (e) => {
        setName(e.target.value)
    }
    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const changeIsAdmin = (e) => {
        if (e.target.value == 0) {
            setIsAdmin(false)
        } else {
            setIsAdmin(true)
        }
    }

    const handleSubmit = () => {
        if (!avatar) return
        uploadImage(avatar)
    }

    const uploadImage = async (base64EncodedImage) => {
        const res = await axios.post('api/upload', { data: base64EncodedImage })
        if (res && res.data) {
            updateEmployee(res.data.url)
        }
    }

    const updateEmployee = async (imageURL) => {
        const newEmployee = {
            avatar: imageURL,
            username,
            name,
            password,
            phoneNumber,
            email,
            isAdmin,
        }
        console.log(newEmployee)
        const res = await axios
            .patch(`api/employee/${employeeId}`, newEmployee)
            .catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Update Employee Successfully!', { position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000})
        }
    }

    return (
        <div className='employee'>
            <div className='employeeTitleContainer'>
                <h1 className='employeeTitle'>Edit Employee</h1>
            </div>
            <div className='employeeContainer'>
                <div className='employeeShow'>
                    <div className='employeeShowTop'>
                        <img
                            src={avatar || ''}
                            alt=''
                            className='employeeShowImg'
                        />
                        <div className='employeeShowTopTitle'>
                            <span className='employeeShowEmployeename'>
                                {name || ''}
                            </span>
                        </div>
                    </div>
                    <div className='employeeShowBottom'>
                        <div className='employeeShowTitle'>
                            <span>Acounts Details</span>
                            <div className='employeeShowInfo'>
                                <PermIdentity className='employeeShowIcon' />
                                <span className='employeeShowInfoTitle'>
                                    {username || ''}
                                </span>
                            </div>
                            <span>Contact Details</span>
                            <div className='employeeShowInfo'>
                                <PhoneAndroid className='employeeShowIcon' />
                                <span className='employeeShowInfoTitle'>
                                    {phoneNumber || ''}
                                </span>
                            </div>
                            <div className='employeeShowInfo'>
                                <MailOutline className='employeeShowIcon' />
                                <span className='employeeShowInfoTitle'>
                                    {email || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='employeeUpdate'>
                    <span className='employeeUpdateTitle'>Edit</span>
                    <form action='' className='employeeUpdateForm'>
                        <div className='employeeUpdateLeft'>
                            <div className='employeeUpdateItem'>
                                <label htmlFor=''>Employee name</label>
                                <input
                                    type='text'
                                    value={username || ''}
                                    onChange={changeUsername}
                                    className='employeeUpdateInput'
                                />
                            </div>
                            <div className='employeeUpdateItem'>
                                <label htmlFor=''>Full name</label>
                                <input
                                    type='text'
                                    value={name || ''}
                                    onChange={changeName}
                                    className='employeeUpdateInput'
                                />
                            </div>
                            <div className='employeeUpdateItem'>
                                <label htmlFor=''>Email</label>
                                <input
                                    type='text'
                                    value={email || ''}
                                    onChange={changeEmail}
                                    className='employeeUpdateInput'
                                />
                            </div>
                            <div className='employeeUpdateItem'>
                                <label htmlFor=''>Phone</label>
                                <input
                                    type='text'
                                    value={phoneNumber || ''}
                                    onChange={changePhoneNumber}
                                    className='employeeUpdateInput'
                                />
                            </div>
                            <div className='employeeUpdateItem'>
                                <label htmlFor=''>Is Admin</label>
                                <select onChange={changeIsAdmin}>
                                    <option disabled selected value>
                                        -- select an option --
                                    </option>

                                    <option value={1}>True</option>
                                    <option value={0}>False</option>
                                </select>
                            </div>
                        </div>
                        <div className='employeeUpdateRight'>
                            <div className='employeeUpdateUpload'>
                                {avatar && (
                                    <img
                                        src={avatar}
                                        alt=''
                                        className='employeeUpdateImg'
                                    />
                                )}

                                <label htmlFor='file'>
                                    <Publish className='employeeUpdateIcon' />
                                </label>
                                <input
                                    type='file'
                                    id='file'
                                    style={{ display: 'none' }}
                                    onChange={changeAvatar}
                                />
                            </div>
                        </div>
                    </form>
                    <button
                        className='employeeUpdateButton'
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Employee
