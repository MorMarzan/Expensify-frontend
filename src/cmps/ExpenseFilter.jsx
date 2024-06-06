import { useEffect, useState } from "react"
import { expenseService } from "../services/expense.service"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'

export function ExpenseFilter({ filterBy, onSetFilter, onResetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({
        ...filterBy,
        date: filterBy.date ? dayjs(filterBy.date) : null,
    })

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

    function handleDateChange(newValue) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, date: newValue }))
    }

    function _onResetFilter() {
        onResetFilter()
        setFilterByToEdit(expenseService.getDefaultFilter())
    }

    return (
        <div className="expense-filter">
            <fieldset>
                <legend>Filter your expenses:</legend>

                <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="Category"
                        name="category"
                        value={filterByToEdit.category}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value=''>All</MenuItem>
                        {expenseService.gExpenseCategories.map((cat, idx) => <MenuItem value={cat} key={idx}>{cat}</MenuItem>)}
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={filterByToEdit.date}
                        name="date"
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>

                <button className="btn reset" onClick={_onResetFilter}>Reset</button>
            </fieldset>
        </div>
    )
}
