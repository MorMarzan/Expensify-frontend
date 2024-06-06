export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_MSG = 'SET_MSG'
export const SET_THEME = 'SET_THEME'

const initialState = {
  isLoading: false,
  msg: null,
  theme: 'dark'
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_MSG:
      return { ...state, msg: action.msg }

    case SET_THEME:
      return { ...state, theme: action.theme }
    default: return state
  }
}
