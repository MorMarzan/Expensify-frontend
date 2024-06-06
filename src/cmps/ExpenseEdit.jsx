import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { loadExpense, saveExpense } from "../store/actions/expense.actions"
import { expenseService } from "../services/expense.service.local"
import { showErrorMsg, showSuccessMsg } from "../store/actions/system.actions"
import closeIcon from '/images/icon-close.svg'
import { FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider, createTheme } from "@mui/material"

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

                <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={amount || ''}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="Category"
                        name="category"
                        value={category}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value=''>All</MenuItem>
                        {expenseService.gExpenseCategories.map((cat, idx) => <MenuItem value={cat} key={idx}>{cat}</MenuItem>)}
                    </Select>
                </FormControl>

                <TextField id="note" label="Note" value={note} name="note" onChange={handleChange} variant="outlined" autoComplete="off" />

                <button className="btn" disabled={!category || !amount}>Save</button>
            </form>

        </section>
    )
}