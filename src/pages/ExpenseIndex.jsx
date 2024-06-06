import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { PieChart } from "../cmps/PieChart"
import { Link, Outlet, useNavigate } from "react-router-dom"

import { getExpenseCategoryMap, loadExpenses, removeExpense, resetFilterBy, setFilterBy } from "../store/actions/expense.actions"
import { ExpenseList } from "../cmps/ExpenseList"
import { ExpenseFilter } from "../cmps/ExpenseFilter"
import { showErrorMsg, showSuccessMsg } from "../store/actions/system.actions"

export function ExpenseIndex() {

    const expenses = useSelector(storeState => storeState.expenseModule.filteredExpenses)
    const fullExpenses = useSelector(storeState => storeState.expenseModule.expenses)
    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [expenseCategoryMap, setExpenseCategoryMap] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            _loadExpenses()
        } else {
            navigate('/')
        }
    }, [filterBy, user])

    useEffect(() => {
        const map = getExpenseCategoryMap()
        setExpenseCategoryMap(map)
    }, [fullExpenses])

    async function _loadExpenses() {
        try {
            await loadExpenses()
        } catch (error) {
            console.error('Error loading expenses:', error)
            showErrorMsg('Cannot show expenses')
        }
    }

    async function onRemoveExpense(expenseId) {
        try {
            await removeExpense(expenseId)
            showSuccessMsg('Expense removed')
        } catch (err) {
            console.log('Cannot remove expense', err)
            showErrorMsg('Cannot remove expense')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onResetFilter() {
        resetFilterBy()
    }

    return (
        <div className="expense-index full main-layout">
            <ExpenseFilter filterBy={filterBy} onSetFilter={onSetFilter} onResetFilter={onResetFilter} />
            <Link to="/expense/edit" className="btn add">Add Expense</Link>
            {fullExpenses && fullExpenses.length && user ?
                <>
                    <ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} />
                    <PieChart chartInfo={expenseCategoryMap} />
                </>
                :
                <h4>You haven't uploaded any expenses yet.<br></br> Go ahead and start!</h4>
            }
            <Outlet />
        </div>
    )
}
