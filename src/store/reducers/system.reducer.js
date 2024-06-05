export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_MSG = 'SET_MSG'

const initialState = {
  isLoading: false,
  msg: null,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    case SET_MSG:
      return { ...state, msg: action.msg }
    default: return state
  }
}
