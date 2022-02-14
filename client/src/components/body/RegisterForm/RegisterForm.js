import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './RegisterForm.css'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { axios } from '../../../axios'

const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmedPassword: '',
        name: '',
        username: '',
    })

    const { email, password, confirmedPassword, name, username } = registerForm

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(registerForm)
        const res = await axios.post('api/auth/user/signup', registerForm).catch((err) => console.log(err))

        if (res && res.data) {
            console.log(res.data)
        }
    }
    return (
        <div className='login_container'>
            <div className='register_form'>
                <h3>Register</h3>
                <Form className='my-4' onSubmit={handleSubmit}>
                    <Form.Group>
                        <h4>Email address</h4>
                        <Form.Control
                            type='email'
                            placeholder='Enter email address'
                            name='email'
                            required
                            value={email}
                            onChange={onChangeRegisterForm}
                            className='log_input'
                        />
                    </Form.Group>

                    <Form.Group>
                        <h4>Password</h4>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            name='password'
                            required
                            value={password}
                            onChange={onChangeRegisterForm}
                            className='log_input'
                        />
                    </Form.Group>
                    <Form.Group>
                        <h4>Confirm Password</h4>
                        <Form.Control
                            type='password'
                            placeholder='Enter confirmed password'
                            name='confirmedPassword'
                            required
                            value={confirmedPassword}
                            onChange={onChangeRegisterForm}
                            className='log_input'
                        />
                    </Form.Group>
                    <Form.Group>
                        <h4>Name</h4>
                        <Form.Control
                            type='text'
                            placeholder='Enter your name'
                            name='name'
                            required
                            value={name}
                            onChange={onChangeRegisterForm}
                            className='log_input'
                        />
                    </Form.Group>
                    <Form.Group>
                        <h4>Username</h4>
                        <Form.Control
                            type='text'
                            placeholder='Enter your  username'
                            name='username'
                            required
                            value={username}
                            onChange={onChangeRegisterForm}
                            className='log_input'
                        />
                    </Form.Group>
                    <Button
                        variant='success'
                        type='submit'
                        className='btn_prim log_btn'
                    >
                        Register
                    </Button>
                </Form>
                <p className='block'>
                    Already have an account?{' '}
                    <span>
                        <Link to='/login'>
                            <Button variant='info' size='sm' className='login'>
                                Login
                            </Button>
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm
