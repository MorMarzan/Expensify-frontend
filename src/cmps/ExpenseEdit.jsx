import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { loadExpense, saveExpense } from "../store/actions/expense.actions"
import { expenseService } from "../services/expense.service.local"
import { showErrorMsg, showSuccessMsg } from "../store/actions/system.actions"
import closeIcon from '/images/icon-close.svg'

export function ExpenseEdit() {
    const navigate = useNavigate()
    const { expenseId } = useParams()
    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())

    useEffect(() => {
        _loadExpense()
    }, [expenseId])

    async function _loadExpense() {
        try {
            if (expenseId) {
                const expenseToEdit = await loadExpense(expenseId)
                console.log('in edit', expenseToEdit)
                setExpenseToEdit(expenseToEdit)
            }
        } catch (err) {
            console.error('Error loading expense:', err)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setExpenseToEdit(prevExpense => ({ ...prevExpense, [field]: value }))
    }


    async function onSaveExpense(ev) {
        ev.preventDefault()
        try {
            const savedExpense = await saveExpense(expenseToEdit)
            showSuccessMsg(`Expense of ${savedExpense.amount}$ updated successfully`)
            navigate('/expense')
        } catch (err) {
            console.log('Cannot update expense', err)
            showErrorMsg('Cannot update expense')
        }
    }

    const { amount, category, note } = expenseToEdit

    return (
        <section className="expense-edit">
            <Link to={'/expense'} className="close"><img src={closeIcon} alt="close"></img></Link>
            <h1>{expenseId ? 'Edit' : 'Add'} Expense</h1>
            <form onSubmit={onSaveExpense}>

                <label htmlFor="amount">Amount</label>
                <input onChange={handleChange} value={amount || ''} type="number" name="amount" id="amount" />

                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange} value={category}>
                    <option value=''>All</option>
                    {expenseService.gExpenseCategories.map((cat, idx) => <option value={cat} key={idx}>{cat}</option>)}
                </select>

                <label htmlFor="note">Name</label>
                <textarea onChange={handleChange} value={note} type="text" name="note" id="note" />

                <button className="btn" disabled={!category || !amount}>Save</button>
            </form>

        </section>
    )
}