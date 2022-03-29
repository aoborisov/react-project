import React from 'react'

const SimpleComponent = ({isAuth, onLogin, onLogOut}) => {
    return (
        <button
            className='btn btn-primary'
            onClick={isAuth ? onLogOut : onLogin}
        >
            {isAuth ? 'LogOut' : 'Login'}
        </button>
    )
}

export default SimpleComponent
