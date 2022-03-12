import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()
    const location = useLocation()

    return (
        <ul className="nav nav-tabs m-3 mb-0">
            <li className="nav-item">
                <button
                    className={
                        'nav-link' +
                        (location.pathname === '/' ? ' active' : '')
                    }
                    onClick={() => {
                        history.push('/')
                    }}
                >
                    Main
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={
                        'nav-link' +
                        (location.pathname === '/login' ? ' active' : '')
                    }
                    onClick={() => {
                        history.push('/login')
                    }}
                >
                    Login
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={
                        'nav-link' +
                        (location.pathname === '/users' ? ' active' : '')
                    }
                    onClick={() => {
                        history.push('/users')
                    }}
                >
                    Users
                </button>
            </li>
        </ul>
    )
}

export default NavBar
