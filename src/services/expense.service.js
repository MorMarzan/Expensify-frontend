import { httpService } from './http.service.js'

const BASE_URL = 'expense/'
const gExpenseCategories = ["Food", "Transport", "Utilities", "Entertainment", "Healthcare"]

export const expenseService = {
    query,
    getById,
    save,
    remove,
    getEmptyExpense,
    getDefaultFilter,
    gExpenseCategories
}

async function query() {
    try {
        return await httpService.get(BASE_URL)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting expenses')
    }
}

async function getById(expenseId) {
    try {
        const returnedExpense = await httpService.get(BASE_URL + expenseId)
        return returnedExpense
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting expense')
    }
}

async function remove(expenseId) {
    try {
        return await httpService.delete(BASE_URL + expenseId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing expense')
    }
}

async function save(expense) {
    try {
        if (expense._id) {
            return await httpService.put(BASE_URL + expense._id, expense)
        } else {
            return await httpService.post(BASE_URL, expense)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving expense')
    }
}

function getEmptyExpense() {
    return {
        amount: 0,
        category: '',
        note: '',
    }
}

function getDefaultFilter() {
    return {
        date: null,
        category: '',
    }
}

