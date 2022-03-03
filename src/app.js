import React from 'react'
import Users from './layout/users'
import NavBar from './components/navBar'
import { Route, Switch } from 'react-router-dom'
import Main from './layout/main'
import Login from './layout/login'

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path={'/'} exact component={Main} />
                <Route path={'/users/:userId?'} exact component={Users} />
                <Route path={'/login'} component={Login} />
            </Switch>
        </>
    )
}

export default App
