import { utilService } from "../services/util.service"

export default function ExpensePreview({ expense }) {
    const { amount, date, note = '', category, _id } = expense
    return (
        <>
            <div>{category}</div>
            <div>{amount}$</div>
            <div>{utilService.formatTimestamp(date)}</div>
            <div className="ellipses-overflow">{note}</div>
        </>
    )
}
