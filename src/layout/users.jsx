import React from 'react'
import { Route, Switch } from 'react-router-dom'
import UsersList from '../components/usersList'
import UserPage from '../components/userPage'
const Users = () => {
    return (
        <>
            <Switch>
                <Route path={'/users/'} exact component={UsersList} />
                <Route path={'/users/:userId'} exact component={UserPage} />
            </Switch>
        </>
    )
}

export default Users
