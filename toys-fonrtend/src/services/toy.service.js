// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import Axios from 'axios';
import { httpService } from './http.service.js';
const axios = Axios.create({
    withCredentials: true
});
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

// const STORAGE_KEY = 'toys'
const listeners = []

export const toyService = {
    query,
    getById,
    save,
    remove,
    subscribe

}
window.cs = toyService;


async function query(filterBy = null) {
    return await httpService.get('toy', filterBy)
    // return await axios.get('http://localhost:3030/api/toy', { params: filterBy })
}

function getById(toyId) {
    return axios.get(`${BASE_URL}toy/${toyId}`).then(res => res.data)
}

async function remove(toyId) {
    return await httpService.delete(`toy/${toyId}`)
    // return axios.delete(`http://localhost:3030/api/toy/${toyId}`)

}
async function save(toy) {
    if (toy._id) {
        return await httpService.put(`toy/${toy._id}`, toy)
        // return axios.put(`http://localhost:3030/api/toy/${toy._id}`, toy).then(res => res.data)

    } else {
        return await httpService.post('toy', toy)
        // return axios.post('http://localhost:3030/api/toy', toy).then(res => res.data)
    }
}


function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersCarsChanged(cars) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(cars))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(cars => {
            _notifySubscribersCarsChanged(cars)
        })
})





