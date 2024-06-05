import { useEffect, useState } from "react"
import { expenseService } from "../services/expense.service.local"

export function ExpenseFilter({ filterBy, onSetFilter, onResetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="expense-filter">
            <fieldset>
                <legend>Filter your expenses:</legend>

                <label htmlFor="category">Category</label>
                <select name="category" id="category" onChange={handleChange} value={filterBy.category}>
                    <option value=''>All</option>
                    {expenseService.gExpenseCategories.map((cat, idx) => <option value={cat} key={idx}>{cat}</option>)}
                </select>

                <label htmlFor="date">Date</label>
                <input value={filterBy.date} onChange={handleChange} type="date" id="date" name="date" />

                <button className="btn reset" onClick={onResetFilter}>Reset</button>
            </fieldset>
        </div>
    )
}
