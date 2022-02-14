import { createSlice } from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        currentEmployee: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart:(state) => {
            state.isFetching=true
        },
        loginSuccess:(state, action) => {
            state.isFetching=false
            state.currentEmployee=action.payload
            state.error=false
        },
        loginFailure:(state)=>{
            state.isFetching=false
            state.error=true
        },
        updateEmployee:(state, action)=>{
            state.currentEmployee.result.name = action.payload.name 
            state.currentEmployee.result.username = action.payload.username 
            state.currentEmployee.result.phoneNumber = action.payload.phoneNumber 
            state.currentEmployee.result.email = action.payload.email
            state.currentEmployee.result.avatar = action.payload.avatar
        },
        logoutUser:(state, action)=>{
            state.currentEmployee = null
            state.isFetching = false
            state.error = false
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, updateEmployee, logoutUser } = employeeSlice.actions
export default employeeSlice.reducer
