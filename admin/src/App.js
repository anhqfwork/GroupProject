import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import './app.css'
import Home from './pages/home/Home'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/productList/ProductList'
import Product from './pages/product/Product'
import NewProduct from './pages/newProduct/NewProduct'
import EmployeeList from './pages/employeeList/EmployeeList'
import NewEmployee from './pages/newEmployee/NewEmployee'
import Employee from './pages/employee/Employee'
import OrderList from './pages/orderList/OrderList'
import Order from './pages/order/Order'
import Profile from './pages/profile/Profile'
import LoginForm from './pages/login/LoginForm'
import Forbidden from './pages/forbidden/Forbidden'
import Test from './pages/test/Test'
import LoginSuccess from './pages/loginSuccess/LoginSuccess'

import { useSelector } from 'react-redux'

function App() {
    const employee = useSelector((state) => state.employee.currentEmployee)

    return (
        <Router>
            {employee ? <Topbar /> : <></>}
            <div className='container'>
                {employee ? <Sidebar /> : <></>}
                <Routes>
                    <Route path='/login' element={employee ? <Navigate to='/' /> : <LoginForm />} />
                    <Route
                        path='/'
                        element={employee ? <Home /> : <Navigate to='/login' />}
                    />
                    <Route
                        path='/profile'
                        element={
                            employee ? <Profile /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/users'
                        element={
                            employee ? <UserList /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/user/:userId'
                        element={employee ? <User /> : <Navigate to='/login' />}
                    />
                    <Route
                        path='/newUser'
                        element={
                            employee ? <NewUser /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/products'
                        element={
                            employee ? (
                                <ProductList />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/product/:productId'
                        element={
                            employee ? <Product /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/newproduct'
                        element={
                            employee ? <NewProduct /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/employees'
                        element={
                            employee ? (
                                <EmployeeList />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/employee/:employeeId'
                        element={<Employee />}
                    />
                    <Route
                        path='/newEmployee'
                        element={
                            employee ? (
                                <NewEmployee />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/orders'
                        element={
                            employee ? <OrderList /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/order/:orderId'
                        element={
                            employee ? <Order /> : <Navigate to='/login' />
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
