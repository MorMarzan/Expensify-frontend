import { useNavigate } from "react-router-dom"

export function Logo() {

    const navigate = useNavigate()

    return (
        <h1 className="logo" onClick={() => navigate('/')}>Expensify</h1>
    )
}
