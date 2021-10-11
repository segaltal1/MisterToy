import { toyService } from "../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { socketService } from "../services/socket.service.js";

export function loadToys(filterBy) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'START_LOADING',
            })
            const toys = await toyService.query(filterBy)
            dispatch({
                type: 'SET_TOYS',
                toys: toys
            })
            socketService.on('toy remove', (toy) => {
                dispatch({ type: 'REMOVE_TOY', toyId: toy })
                showSuccessMsg('Toy removed by Admin')
            })
            socketService.on('toy add', (savedToy) => {
                dispatch({ type: 'ADD_TOY', toy: savedToy })
                showSuccessMsg('Toy Add by Admin')

            })
            // socketService.on('toy update', (savedToy) => {
            //     dispatch({ type: 'UPDATE_TOY', toy: savedToy })
            //     showSuccessMsg('Toy update by Admin')

            // })
        } catch (err) {
            showErrorMsg('Cannot load toys')
            console.log('Cannot load toys', err)
        }
        finally {
            dispatch({
                type: 'LOADING_DONE',
            })
        }
    }
}

export function onRemoveToy(toyId) {
    return async (dispatch, getState) => {
        try {
            const toy = await toyService.remove(toyId)

            dispatch({
                type: 'REMOVE_TOY',
                toyId: toy
            })
            socketService.emit('remoe item', toy)

            showSuccessMsg('Toy removed')

        } catch (err) {
            console.log('Cannot remove Toy', err)
            showErrorMsg('Cannot remove Toy')
        }
    }
}

export function onAddToy(toy) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.save(toy)
            dispatch({
                type: 'ADD_TOY',
                toy: savedToy
            })
            socketService.emit('add item', toy)

            showSuccessMsg('Toy Added')

        } catch (err) {
            showErrorMsg('Cannot add Toy')
            console.log('Cannot add Toy', err)

        }
    }
}

export function onEditToy(toyToSave) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.save(toyToSave)
            dispatch({
                type: 'UPDATE_TOY',
                toy: savedToy
            })
            socketService.emit('update item', savedToy)

            showSuccessMsg('Toy updated')

        } catch (err) {
            showErrorMsg('Cannot update toy')
            console.log('Cannot save toy', err)
        }
    }
}

export function addToCart(toy) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            toy
        })
    }
}
