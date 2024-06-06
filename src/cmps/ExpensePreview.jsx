import { utilService } from "../services/util.service"

export default function ExpensePreview({ expense }) {
    const { amount, date, note = '', category, _id } = expense
    return (
        <>
            <div className="ellipses-overflow">{category}</div>
            <div>{amount}$</div>
            <div>{utilService.formatTimestamp(date)}</div>
            <div className="ellipses-overflow hide-on-mobile">{note}</div>
        </>
    )
}
