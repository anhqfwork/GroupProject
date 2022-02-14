import { loginStart, loginSuccess, loginFailure } from './employeeRedux'
import { axios } from '../axios'

export const login = async (dispatch, employee) => {
    dispatch(loginStart())
    try {
        console.log(employee)
        const res = await axios
            .post('api/auth/employee/login', employee)
        if (res && res.data) {
            dispatch(loginSuccess(res.data))
        }
    } catch (err) {
        dispatch(loginFailure())
    }
}
