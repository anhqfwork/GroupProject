import React from 'react'
import './topbar.css'
import { NotificationsNone, Language, Settings } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/employeeRedux'

export default function Topbar() {
    let employee = ''
    const currentEmployee = useSelector((state) => state.employee.currentEmployee)
    if (currentEmployee) {
        employee = currentEmployee.result
    }

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }
    return (
        <div className='topbar'>
            <div className='tobarWrapper'>
                <div className='topLeft'>
                    <span className='logo'>Management</span>
                </div>
                <div className='topRight'>
                    <div className='welcome-text'>Hi {employee.name}!</div>
                    {/* <div className='topbarIconContainer'>
                        <Language />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <NotificationsNone />
                        <span className='topIconBadge'>2</span>
                    </div>
                    <div className='topbarIconContainer'>
                        <Settings />
                    </div> */}
                    <Link to='/profile' className='welcome-text'>
                        <img
                            src={employee.avatar || ''}
                            alt=''
                            className='topAvatar'
                        />
                    </Link>
                    <button
                        className='logout_btn'
                        onClick={() => logout()}
                    >
                        <Link to='/login' className='logout_link'>Logout</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
