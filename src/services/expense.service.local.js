
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'expense'
const gCategories = ["Food", "Transport", "Utilities", "Entertainment", "Healthcare"]


export const expenseService = {
    query,
    getById,
    save,
    remove,
    getEmptyExpense,
}
window.cs = expenseService
_createExpenses()

async function query(filterBy = { date: '', category: '' }) {
    var expenses = await storageService.query(STORAGE_KEY)
    if (filterBy.category) {
        expenses = expenses.filter(expense => expense.category === filterBy.category)
    }
    if (filterBy.date) {
        const filterDate = new Date(filterBy.date).getTime()
        expenses = expenses.filter(expense => expense.date === filterDate)
    }
    return expenses
}

function getById(expenseId) {
    return storageService.get(STORAGE_KEY, expenseId)
}

async function remove(expenseId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, expenseId)
}

async function save(expense) {
    var savedExpense
    if (expense._id) {
        savedExpense = await storageService.put(STORAGE_KEY, expense)
    } else {
        // Later, owner is set by the backend
        // expense.owner = userService.getLoggedinUser()
        savedExpense = await storageService.post(STORAGE_KEY, expense)
    }
    return savedExpense
}

function getEmptyExpense() {
    return {
        amount: 0,
        categories: [],
        note: '',
    }
}

function _createExpenses() {
    let expenses = utilService.loadFromStorage(STORAGE_KEY)
    if (!expenses || !expenses.length) {
        _createDemoExpenses()
    }
}

function _createDemoExpenses() {
    const expenses = [
        {
            id: utilService.makeId(),
            date: new Date(2024, 0, 15).getTime(),  // January 15, 2024
            amount: 50,
            category: "Food",
            note: "Grocery shopping",
            userId: 1234
        },
        {
            id: utilService.makeId(),
            date: new Date(2024, 2, 10).getTime(),  // March 10, 2024
            amount: 20,
            category: "Transport",
            note: "Bus ticket",
            userId: 1234
        },
        {
            id: utilService.makeId(),
            date: new Date(2024, 4, 25).getTime(),  // May 25, 2024
            amount: 100,
            category: "Utilities",
            note: "Electricity bill",
            userId: 1234
        },
        {
            id: utilService.makeId(),
            date: new Date(2024, 6, 5).getTime(),  // July 5, 2024
            amount: 30,
            category: "Entertainment",
            note: "Movie ticket",
            userId: 1234
        },
        {
            id: utilService.makeId(),
            date: new Date(2024, 8, 12).getTime(),  // September 12, 2024
            amount: 75,
            category: "Healthcare",
            note: "Doctor's appointment",
            userId: 1234
        },
        {
            id: utilService.makeId(),
            date: new Date(2024, 10, 20).getTime(),  // November 20, 2024
            amount: 40,
            category: "Food",
            note: "Dinner at a restaurant",
            userId: 1234
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, expenses)
}

function _createExpense(amount = 0, categories = [], note = '') {
    return {
        id: utilService.makeId(),
        date: Date.now(),
        amount,
        categories,
        note,
        userId: 1234
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




