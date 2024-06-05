import { utilService } from "../services/util.service"

export default function ExpensePreview({ expense }) {
    const { amount, date, note = '', category } = expense
    return (
        <article className='expense-preview grid'>
            <div>{category}</div>
            <div>{amount}$</div>
            <div>{utilService.formatTimestamp(date)}</div>
            {note && <div>{note}</div>}
        </article>
    )
}
