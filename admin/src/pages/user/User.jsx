import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './user.css'
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

export default function User() {
    const [avatar, setAvatar] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()

    const { userId } = useParams()

    const getUser = async () => {
        const res = await axios
            .get(`api/user/${userId}`)
            .catch((err) => console.log(err))
        if (res && res.data) {
            const user = res.data.user
            setAvatar(user.avatar)
            setEmail(user.email)
            setUsername(user.username)
            setName(user.name)
            setPassword(user.password)
            setAddress(user.address)
            setPhoneNumber(user.phoneNumber)
        }
    }

    useEffect(() => {
        getUser()
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

    const changeAddress = (e) => {
        setAddress(e.target.value)
    }

    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleSubmitFile = () => {
        console.log('submiting')
        if (!avatar) return
        console.log('uploading')
        uploadImage(avatar)
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        const res = await axios.post('api/upload', {data: base64EncodedImage})
        if (res && res.data) {
            updateUser(res.data.url)
        }
    }

    const updateUser = async (imageURL) => {
        const newUser = {
            avatar: imageURL,
            username,
            name,
            password,
            address,
            phoneNumber,
            email
        }
        const res = await axios.patch(`api/user/${userId}`, newUser).catch((err) => console.log(err))
        if (res && res.data) {
            console.log(res.data)
            toast.success('Update User Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='user'>
            <div className='userTitleContainer'>
                <h1 className='userTitle'>Edit User</h1>
            </div>
            <div className='userContainer'>
                <div className='userShow'>
                    <div className='userShowTop'>
                        <img
                            src={avatar || ''}
                            alt=''
                            className='userShowImg'
                        />
                        <div className='userShowTopTitle'>
                            <span className='userShowUsername'>
                                {name || ''}
                            </span>
                        </div>
                    </div>
                    <div className='userShowBottom'>
                        <div className='userShowTitle'>
                            <span>Acounts Details</span>
                            <div className='userShowInfo'>
                                <PermIdentity className='userShowIcon' />
                                <span className='userShowInfoTitle'>
                                    {username || ''}
                                </span>
                            </div>
                            {/* <div className='userShowInfo'>
                                <CalendarToday className='userShowIcon' />
                                <span className='userShowInfoTitle'>
                                    {!user || user.dob}
                                </span>
                            </div> */}
                            <span>Contact Details</span>
                            <div className='userShowInfo'>
                                <PhoneAndroid className='userShowIcon' />
                                <span className='userShowInfoTitle'>
                                    {phoneNumber || ''}
                                </span>
                            </div>
                            <div className='userShowInfo'>
                                <MailOutline className='userShowIcon' />
                                <span className='userShowInfoTitle'>
                                    {email || ''}
                                </span>
                            </div>
                            <div className='userShowInfo'>
                                <LocationSearching className='userShowIcon' />
                                <span className='userShowInfoTitle'>
                                    {address || ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='userUpdate'>
                    <span className='userUpdateTitle'>Edit</span>
                    <form action='' className='userUpdateForm'>
                        <div className='userUpdateLeft'>
                            <div className='userUpdateItem'>
                                <label htmlFor=''>Username</label>
                                <input
                                    type='text'
                                    value={username || ''}
                                    onChange={changeUsername}
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateItem'>
                                <label htmlFor=''>Full name</label>
                                <input
                                    type='text'
                                    value={name || ''}
                                    onChange={changeName}
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateItem'>
                                <label htmlFor=''>Email</label>
                                <input
                                    type='text'
                                    value={email || ''}
                                    onChange={changeEmail}
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateItem'>
                                <label htmlFor=''>Phone</label>
                                <input
                                    type='text'
                                    value={phoneNumber || ''}
                                    onChange={changePhoneNumber}
                                    className='userUpdateInput'
                                />
                            </div>
                            <div className='userUpdateItem'>
                                <label htmlFor=''>Address</label>
                                <input
                                    type='text'
                                    value={address || ''}
                                    onChange={changeAddress}
                                    className='userUpdateInput'
                                />
                            </div>
                        </div>
                        <div className='userUpdateRight'>
                            <div className='userUpdateUpload'>
                                {avatar && (
                                    <img
                                        src={avatar}
                                        alt=''
                                        className='userUpdateImg'
                                    />
                                )}
                                <label htmlFor='file'>
                                    <Publish className='userUpdateIcon' />
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
                        className='userUpdateButton'
                        onClick={() => handleSubmitFile()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}
