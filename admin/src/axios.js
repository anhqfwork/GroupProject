import Axios from 'axios'

const employee = JSON.parse(localStorage.getItem('persist:root'))?.employee
const currentEmployee = employee && JSON.parse(employee).currentEmployee
const TOKEN = currentEmployee?.accessToken

export const axios = Axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        token: `Bearer ${TOKEN}`,
    },
})
