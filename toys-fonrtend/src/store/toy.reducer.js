const initialState = {
    toys: [],
    cart: [],
    // lastRemovedCar: null
    isLoading: false
}
export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys, isLoading: false }
            break
        case 'REMOVE_TOY':
            const lastRemovedCar = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = { ...state, toys, lastRemovedCar }
            break
        case 'ADD_TOY':
            newState = { ...state, toys: [...state.toys, action.toy] }
            break
        case 'UPDATE_TOY':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            newState = { ...state, toys }
            break
        case 'ADD_TO_TOYT':
            newState = { ...state, toyt: [...state.toyt, action.toy] }
            break
        case 'START_LOADING':
            newState = { ...state, isLoading: true }
            break
        default:
    }
    // For debug:
    window.toyState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
