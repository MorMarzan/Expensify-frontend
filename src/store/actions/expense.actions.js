import { expenseService } from "../../services/expense.service"
import { ADD_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES, UPDATE_EXPENSE, SET_FILTER_BY, SET_FILTERED_EXPENSE } from "../reducers/expense.reducer.js"
import { SET_IS_LOADING } from "../reducers/system.reducer.js"
import { store } from "../store.js"

export async function loadExpenses() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const expenses = await expenseService.query()
        store.dispatch({ type: SET_EXPENSES, expenses })
        loadFilteredExpenses()
    } catch (err) {
        console.log('expense action -> Cannot load expenses', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        }, 1000)
    }
}

export function loadFilteredExpenses() {
    const filterBy = store.getState().expenseModule.filterBy
    let expenses = JSON.parse(JSON.stringify(store.getState().expenseModule.expenses))

    if (filterBy.category) {
        expenses = expenses.filter(expense => expense.category === filterBy.category)
    }
    if (filterBy.date) {
        const filterDate = new Date(filterBy.date)
        filterDate.setHours(0, 0, 0, 0)
        expenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            expenseDate.setHours(0, 0, 0, 0) // Set to the start of the day
            return expenseDate.getTime() === filterDate.getTime()
        })
    }
    store.dispatch({ type: SET_FILTERED_EXPENSE, expenses })
    return expenses
}

export async function loadExpense(expenseId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const expense = await expenseService.getById(expenseId)
        return expense
    } catch (err) {
        console.log('expense action -> Cannot load expenses', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        }, 1000)
    }
}

export async function removeExpense(expenseId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        await expenseService.remove(expenseId)
        store.dispatch({ type: REMOVE_EXPENSE, expenseId })
        loadFilteredExpenses()
    } catch (err) {
        console.error('expense action -> Cannot remove expense', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        }, 1000)
    }
}

export async function saveExpense(expense) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = expense._id ? UPDATE_EXPENSE : ADD_EXPENSE
    try {
        const expenseToSave = await expenseService.save(expense)
        store.dispatch({ type, expense: expenseToSave })
        loadFilteredExpenses()
        return expenseToSave
    } catch (err) {
        console.error('expense action -> Cannot save expense', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        }, 1000)
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function resetFilterBy() {
    const filterBy = expenseService.getDefaultFilter()
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function getExpenseCategoryMap() {
    const expenses = store.getState().expenseModule.expenses
    return expenses.reduce((acc, expense) => {
        const currCategory = expense.category
        acc[currCategory] = acc[currCategory] ? acc[currCategory] + expense.amount : expense.amount
        return acc
    }, {})

}