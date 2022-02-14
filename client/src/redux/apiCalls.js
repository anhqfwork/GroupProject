import { loginStart, loginSuccess, loginFailure } from './userRedux'
import { axios } from '../axios'

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        console.log(user)
        const res = await axios.post('api/auth/user/login', user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}
