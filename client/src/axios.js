import Axios from 'axios'

const user = JSON.parse(localStorage.getItem('persist:root'))?.user
const currentUser = user && JSON.parse(user).currentUser
const TOKEN = currentUser?.accessToken

export const axios = Axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        token: `Bearer ${TOKEN}`,
    },
})