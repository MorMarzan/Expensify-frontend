import { useState } from "react"
import { userService } from "../services/user.service.js"
import { TextField } from "@mui/material"

export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    return (
        <form className="login-form grid" onSubmit={handleSubmit} autoComplete="off">

            <TextField
                label="Username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                fullWidth
                autoComplete="off"
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                fullWidth
                autoComplete="off"
            />
            {isSignup &&
                <TextField
                    label="Full name"
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="off"
                />
            }
            <button className="btn">{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}