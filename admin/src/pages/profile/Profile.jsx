import React, { useState, useEffect } from 'react'
import './profile.css'
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from '@material-ui/icons'
import { axios } from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmployee } from '../../redux/employeeRedux'
import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Profile() {
    const employee = useSelector(
        (state) => state.employee.currentEmployee.result
    )

    const dispatch = useDispatch()

    const [profileForm, setProfileForm] = useState({
        name: employee.name,
        username: employee.username,
        phoneNumber: employee.phoneNumber,
        avatar: employee.avatar,
        email: employee.email,
    })

    const { name, username, phoneNumber, email, avatar } = profileForm

    const onChangeProfileForm = (e) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value,
        })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setProfileForm({
                ...profileForm,
                avatar: reader.result,
            })
        }
    }

    const handleSubmit = async () => {
        console.log('submiting')
        if (!avatar) return
        console.log('uploading')
        uploadImage(avatar)
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        const res = await axios.post('api/upload', { data: base64EncodedImage })
        if (res && res.data) {
            updateEmployeeChanges(res.data.url)
        }
    }

    const updateEmployeeChanges = async (imageURL) => {
        const newEmployee = {
            avatar: imageURL,
            username,
            name,
            phoneNumber,
            email,
        }
        const res = await axios
            .patch(`api/employee/${employee._id}`, newEmployee)
            .catch((err) => console.log(err))

        if (res && res.data) {
            console.log(res.data)
            dispatch(
                updateEmployee({ name, username, phoneNumber, email, avatar })
            )
            toast.success('Update Profile Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }

    return (
        <div className='currentUser'>
            <div className='currentUserTitleContainer'>
                <h1 className='currentUserTitle'>Edit Profile</h1>
            </div>
            <div className='currentUserContainer'>
                <div className='currentUserShow'>
                    <div className='currentUserShowTop'>
                        <img
                            src={employee.avatar}
                            alt=''
                            className='currentUserShowImg'
                        />
                        <div className='currentUserShowTopTitle'>
                            <span className='currentUserShowUsername'>
                                {employee.name}
                            </span>
                        </div>
                    </div>
                    <div className='userShowBottom'>
                        <div className='currentUserShowTitle'>
                            <span>Acounts Details</span>
                            <div className='currentUserShowInfo'>
                                <PermIdentity className='currentUserShowIcon' />
                                <span className='currentUserShowInfoTitle'>
                                    {employee.username}
                                </span>
                            </div>
                            {/* <div className='currentUserShowInfo'>
                                <CalendarToday className='currentUserShowIcon' />
                                <span className='currentUserShowInfoTitle'>
                                    10.12.1999
                                </span>
                            </div> */}
                            <span>Contact Details</span>
                            <div className='currentUserShowInfo'>
                                <PhoneAndroid className='currentUserShowIcon' />
                                <span className='currentUserShowInfoTitle'>
                                    {employee.phoneNumber}
                                </span>
                            </div>
                            <div className='currentUserShowInfo'>
                                <MailOutline className='currentUserShowIcon' />
                                <span className='currentUserShowInfoTitle'>
                                    {employee.email}
                                </span>
                            </div>
                            {/* <div className='currentUserShowInfo'>
                                <LocationSearching className='currentUserShowIcon' />
                                <span className='currentUserShowInfoTitle'>
                                    New York | USA
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='currentUserUpdate'>
                    <span className='currentUserUpdateTitle'>Edit</span>
                    <form action='' className='currentUserUpdateForm'>
                        <div className='currentUserUpdateLeft'>
                            <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Username</label>
                                <input
                                    type='text'
                                    value={username || ''}
                                    name='username'
                                    onChange={onChangeProfileForm}
                                    className='currentUserUpdateInput'
                                />
                            </div>
                            {/* <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Password</label>
                                <input
                                    type='password'
                                    placeholder='new password'
                                    className='currentUserUpdateInput'
                                />
                            </div> */}
                            <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Full name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={name || ''}
                                    onChange={onChangeProfileForm}
                                    className='currentUserUpdateInput'
                                />
                            </div>
                            <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Email</label>
                                <input
                                    type='text'
                                    name='email'
                                    value={email || ''}
                                    onChange={onChangeProfileForm}
                                    className='currentUserUpdateInput'
                                />
                            </div>
                            <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Phone</label>
                                <input
                                    type='text'
                                    name='phoneNumber'
                                    value={phoneNumber || ''}
                                    onChange={onChangeProfileForm}
                                    className='currentUserUpdateInput'
                                />
                            </div>
                            {/* <div className='currentUserUpdateItem'>
                                <label htmlFor=''>Address</label>
                                <input
                                    type='text'
                                    placeholder='New York | USA'
                                    className='currentUserUpdateInput'
                                />
                            </div> */}
                        </div>
                        <div className='currentUserUpdateRight'>
                            <div className='currentUserUpdateUpload'>
                                <img
                                    src={avatar || ''}
                                    alt=''
                                    className='currentUserUpdateImg'
                                />
                                <label htmlFor='file'>
                                    <Publish className='currentUserUpdateIcon' />
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
                        className='currentUserUpdateButton'
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
