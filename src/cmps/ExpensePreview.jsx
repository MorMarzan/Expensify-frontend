
export default function ExpensePreview({ expense }) {
    return (
        <article className='toy-preview' >
            <h4>{expense.amount}$</h4>
            <h4>{expense.note}</h4>

        </article>
    )
}
