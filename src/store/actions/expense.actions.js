import { expenseService } from "../../services/expense.service.local.js"
import { ADD_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES, UPDATE_EXPENSE, SET_FILTER_BY } from "../reducers/expense.reducer.js"
import { store } from "../store.js"

export async function loadExpenses() {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().expenseModule.filterBy
    try {
        const expenses = await expenseService.query(filterBy)
        store.dispatch({ type: SET_EXPENSES, expenses })
    } catch (err) {
        console.log('expense action -> Cannot load expenses', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadExpense(expenseId) {
    try {
        const expense = await expenseService.getById(expenseId)
        return expense
    } catch (err) {
        console.log('expense action -> Cannot load expenses', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeExpense(expenseId) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        await expenseService.remove(expenseId)
        store.dispatch({ type: REMOVE_EXPENSE, expenseId })
    } catch (err) {
        console.error('expense action -> Cannot remove expense', err)
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function saveExpense(expense) {
    const type = expense._id ? UPDATE_EXPENSE : ADD_EXPENSE
    try {
        const expenseToSave = await expenseService.save(expense)
        store.dispatch({ type, expense: expenseToSave })
        return expenseToSave
    } catch (err) {
        console.error('expense action -> Cannot save expense', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function resetFilterBy() {
    const filterBy = expenseService.getDefaultFilter()
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
