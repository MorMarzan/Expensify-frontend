import { useSelector } from "react-redux"
import { loadExpenses } from "../store/actions/expense.actions"
import { useEffect } from "react"

export function ExpenseIndex() {

    const expenses = useSelector(storeState => storeState.expenseModule.expenses)

    useEffect(() => {
        _loadExpenses()
    }, [])

    async function _loadExpenses() {
        try {
            await loadExpenses()
        } catch (error) {
            console.error('Error loading expenses:', error)
            showErrorMsg('Cannot show expenses')
        }
    }

    return (
        <div className="expense-index" style={{ color: 'black' }}>
            hi from ExpenseInde
            <pre>{JSON.stringify(expenses, null, 2)}</pre>
        </div>
    )
}
