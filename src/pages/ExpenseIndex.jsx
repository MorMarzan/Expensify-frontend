import { useSelector } from "react-redux"
import { loadExpenses, resetFilterBy, setFilterBy } from "../store/actions/expense.actions"
import { useEffect } from "react"
import { ExpenseList } from "../cmps/ExpenseList"
import { ExpenseFilter } from "../cmps/ExpenseFilter"

export function ExpenseIndex() {

    const expenses = useSelector(storeState => storeState.expenseModule.expenses)
    const filterBy = useSelector(storeState => storeState.expenseModule.filterBy)

    useEffect(() => {
        _loadExpenses()
    }, [filterBy])

    async function _loadExpenses() {
        try {
            await loadExpenses()
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
        </div>
    )
}
