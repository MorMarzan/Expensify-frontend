import { SET_MSG, SET_IS_LOADING, SET_THEME } from '../reducers/system.reducer.js'
import { store } from '../store'

// Loading
export function setIsLoading(isLoading) {
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}

// msg
export function showSuccessMsg(txt) {
    store.dispatch({ type: SET_MSG, msg: { type: 'success', txt } })
}

export function showErrorMsg(txt) {
    store.dispatch({ type: SET_MSG, msg: { type: 'error', txt } })
}

export function setMsg(msg) {
    store.dispatch({ type: SET_MSG, msg })
}

//theme
export function setTheme(theme) {
    store.dispatch({ type: SET_THEME, theme })
}

