import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from "../store/actions/system.actions"
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (error) {
            console.error('error at login', error)
            showErrorMsg('Oops try again')
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
            showSuccessMsg('Signed in successfully')
        } catch (error) {
            console.error('error at signup', error)
            showErrorMsg('Oops try again')
        }
    }

    return (
        <div className="login-signup">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup'
                    }
                </a >
            </div>
        </div >
    )
}
