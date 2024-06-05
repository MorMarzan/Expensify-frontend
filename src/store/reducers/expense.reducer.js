import { expenseService } from "../../services/expense.service.local"

export const SET_EXPENSES = 'SET_EXPENSES'
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_FILTERED_EXPENSE = 'SET_FILTERED_EXPENSE'

const initialState = {
    expenses: [],
    filteredExpenses: [],
    filterBy: expenseService.getDefaultFilter(),
}

export function expenseReducer(state = initialState, action = {}) {

    let expenses
    switch (action.type) {
        case SET_EXPENSES:
            return { ...state, expenses: action.expenses }

        case SET_FILTERED_EXPENSE:
            return { ...state, filteredExpenses: action.expenses }

        case REMOVE_EXPENSE:
            expenses = state.expenses.filter(expense => expense._id !== action.expenseId)
            return { ...state, expenses }

        case ADD_EXPENSE:
            expenses = [...state.expenses, action.expense]
            return { ...state, expenses }

        case UPDATE_EXPENSE:
            expenses = state.expenses.map(expense => expense._id === action.expense._id ? action.expense : expense)
            return { ...state, expenses }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return state
    }
}
