import { useSelector } from "react-redux"
import { getExpenseCategoryMap, loadExpenses, resetFilterBy, setFilterBy } from "../store/actions/expense.actions"
import { useEffect, useState } from "react"
import { ExpenseList } from "../cmps/ExpenseList"
import { ExpenseFilter } from "../cmps/ExpenseFilter"
import { showErrorMsg } from "../store/actions/system.actions"
import { PieChart } from "../cmps/PieChart"

export function ExpenseIndex() {

    const expenses = useSelector(storeState => storeState.expenseModule.expenses)
    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)
    const [expenseCategoryMap, setExpenseCategoryMap] = useState({})

    useEffect(() => {
        _loadExpenses()
    }, [filterBy])

    useEffect(() => {
        _getExpenseCategoryMap()
    }, [])

    async function _loadExpenses() {
        try {
            await loadExpenses()
        } catch (error) {
            console.error('Error loading expenses:', error)
            showErrorMsg('Cannot show expenses')
        }
    }

    async function _getExpenseCategoryMap() {
        try {
            const map = await getExpenseCategoryMap()
            setExpenseCategoryMap(map)
        } catch (error) {
            console.error('Error loading expenses:', error)
            showErrorMsg('Cannot show expenses')
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
            <ExpenseList expenses={expenses} />
            <PieChart chartInfo={expenseCategoryMap} />
        </div>
    )
}
