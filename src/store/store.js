import { expenseReducer } from "./reducers/expense.reducer.js"
import { systemReducer } from "./reducers/system.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

import { combineReducers, compose, legacy_createStore as createStore } from "redux"


const rootReducer = combineReducers({
    expenseModule: expenseReducer,
    userModule: userReducer,
    systemModule: systemReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())