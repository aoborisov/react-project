import React, {useState} from 'react'
import CardWrapper from '../../common/Card'

const withLoginButton = Component => props => {
    const isAuth = localStorage.getItem('user')
    const [, setReload] = useState(true)

    const handleLogin = () => {
        localStorage.setItem('user', true)
        setReload(prevState => !prevState)
    }

    const handleLogOut = () => {
        localStorage.removeItem('user')
        setReload(prevState => !prevState)
    }

    return (
        <CardWrapper>
            <Component
                isAuth={isAuth}
                onLogin={handleLogin}
                onLogOut={handleLogOut}
            />
        </CardWrapper>
    )
}

export default withLoginButton
