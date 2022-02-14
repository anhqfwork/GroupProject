import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart:(state) => {
            state.isFetching=true
        },
        loginSuccess:(state, action) => {
            state.isFetching=false
            state.currentUser=action.payload
            state.error=false
        },
        loginFailure:(state)=>{
            state.isFetching=false
            state.error=true
        },
        updateUser:(state, action)=>{
            state.currentUser.result.name = action.payload.name 
            state.currentUser.result.username = action.payload.username 
            state.currentUser.result.phoneNumber = action.payload.phoneNumber 
            state.currentUser.result.address = action.payload.address 
        },
        logoutUser:(state, action)=>{
            state.currentUser = null
            state.isFetching = false
            state.error = false
        }
    },
})

export const { loginStart, loginSuccess, loginFailure, updateUser, logoutUser } = userSlice.actions
export default userSlice.reducer
