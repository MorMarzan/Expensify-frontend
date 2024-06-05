import ExpensePreview from "./ExpensePreview"

export function ExpenseList({ expenses }) {
    return (
        <section className="expense-list">
            <ul className="clean-list headers grid">
                <li>Category</li>
                <li>Amount</li>
                <li>Date</li>
                <li>Notes</li>
            </ul>
            <ul className="clean-list content">
                {expenses.map(expense =>
                    <li key={expense._id}>
                        <ExpensePreview expense={expense} />
                    </li>
                )}
            </ul>
        </section>
    )
}
