import Axios from 'axios'
import { httpService } from './http.service';
const axios = Axios.create({
    withCredentials: true
});

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser
}

window.userService = userService;
async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        // const res = await axios.post('http://localhost:3030/api/auth/login', credentials)
        // const user = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user;
    } catch (err) {
        console.log('Cannot login (service)', err)
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post('auth/signup', credentials)
        // const res = await axios.post(`http://localhost:3030/api/auth/signup`, { credentials })
        // const user = res.data
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        return user
    } catch (err) {
        console.log('Cannot signup (service)', err)
        throw err
    }
}


async function logout() {
    try {
        await httpService.post('auth/logout')
        // await axios.post('http://localhost:3030/api/auth/logout')
        sessionStorage.removeItem(STORAGE_KEY)
    } catch (err) {
        sessionStorage.removeItem(STORAGE_KEY)
    }
    // return axios.post('http://localhost:3030/api/auth/logout').then(() =>
    // sessionStorage.removeItem(STORAGE_KEY)
    // )
}

function getLoggedinUser() {
    return (JSON.parse(sessionStorage.getItem(STORAGE_KEY)));
}