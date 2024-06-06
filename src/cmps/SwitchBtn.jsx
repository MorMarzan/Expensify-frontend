import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setTheme } from "../store/actions/system.actions"

export function SwitchBtn() {
    // const [theme, setTheme] = useState('dark')
    const theme = useSelector(storeState => storeState.systemModule.theme)

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="switch-btn flex align-center">
            <FontAwesomeIcon icon={faSun} onClick={toggleTheme} />
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === 'dark'}
                >
                </input>
                <span className="slider round"></span>
            </label>
            <FontAwesomeIcon icon={faMoon} onClick={toggleTheme} />
        </div>
    )
}
