import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './LoginForm.css'
import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/apiCalls'
import { useSelector } from 'react-redux'

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const { email, password } = loginForm
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector((state) => state.user)

    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(dispatch, { email, password })
    }

    return (
        <div className='login_container'>
            <div className='login_form'>
                <h3>Login</h3>
                <Form className='my-4' onSubmit={handleSubmit}>
                    <Form.Group>
                        <h4>Email address</h4>
                        <Form.Control
                            type='email'
                            placeholder='Enter email address'
                            name='email'
                            required
                            value={email}
                            onChange={onChangeLoginForm}
                            className='log_input'
                        />
                    </Form.Group>
                    <Form.Group>
                        <h4>Password</h4>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            name='password'
                            required
                            value={password}
                            onChange={onChangeLoginForm}
                            className='log_input'
                        />
                    </Form.Group>
                    {error && <div>Something is wrong ...</div>}
                    <Button
                        variant='success'
                        type='submit'
                        className='btn_prim log_btn'
                        disabled={isFetching}
                    >
                        Login
                    </Button>
                </Form>
                <p className='block'>
                    Don't have an account?{' '}
                    <span>
                        <Link to='/register'>
                            <Button
                                variant='info'
                                size='sm'
                                className='register'
                            >
                                Register
                            </Button>
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm
