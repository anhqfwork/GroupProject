import React, { useState, useEffect } from 'react'
import './widgetSm.css'
import { Visibility } from '@material-ui/icons'
import { axios } from '../../axios'
import { Link } from 'react-router-dom'

export default function WidgetSm() {
    const [users, setUsers] = useState([])

    const getAllUsers = async () => {
      const res = await axios.get('api/user/getAllUsers').catch((err) => console.log(err))

      if (res && res.data) {
        const listOf5 = res.data.user.slice(0, 5)
        setUsers(listOf5)
      }
    }

    useEffect(() => {
      getAllUsers()
    }, [])

    const User = (user) => {
        return (
            <li className='widgetSmListItem'>
                <img src={user.avatar} alt='' className='widgetSmImg' />
                <div className='widgetSmUser'>
                    <span className='widgetSmUserName'>{user.name}</span>
                    <span className='widgetSmUserTitle'>{user.email}</span>
                </div>
                <Link to={`/user/${user._id}`}>
                    <button className='widgetSmButton'>
                        <Visibility className='widgetSmIcon' />
                        Display
                    </button>
                </Link>
            </li>
        )
    }
    return (
        <div className='widgetSm'>
            <span className='widgetSmTitle'>New Join Members</span>
            <ul className='widgetSmList'>
                {users.map((user) => {
                    return <User key={user._id} {...user}></User>
                })}
            </ul>
        </div>
    )
}
