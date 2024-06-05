import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ExpensePreview from "./ExpensePreview"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export function ExpenseList({ expenses, onRemoveExpense }) {
    return (
        <section className="expense-list">
            <ul className="clean-list headers grid">
                <li>Category</li>
                <li>Amount</li>
                <li>Date</li>
                <li>Notes</li>
                <li>Actions</li>
            </ul>
            <ul className="clean-list content">
                {expenses.map(expense =>
                    <li key={expense._id} className='expense-preview grid'>
                        <ExpensePreview expense={expense} />
                        <div className="grid cols">
                            <div className="remove" onClick={() => onRemoveExpense(expense._id)}><FontAwesomeIcon icon={faTrash} /></div>
                            <Link to={`/expense/edit/${expense._id}`} className="edit"><FontAwesomeIcon icon={faEdit} /></Link>
                        </div>
                    </li>
                )}

            </ul>
        </section>
    )
}
