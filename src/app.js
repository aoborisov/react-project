import React, { useState, useEffect } from 'react'
import UsersList from './components/usersList'
import API from './api'

const App = () => {
    const initialState = API.users.fetchAll()
    const [users, setUsers] = useState()
    useEffect(() => initialState.then((data) => setUsers(data)), [])

    function handleDelete(id) {
        console.log(id)

        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
    }

    function handleBookmark(id) {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark === false
                    ? (user.bookmark = true)
                    : (user.bookmark = false)
            }

            return user
        })

        setUsers(newUsers)
    }

    // eslint-disable-next-line multiline-ternary
    return users ? (
        <UsersList
            users={users}
            onDelete={handleDelete}
            onBookmark={handleBookmark}
        />
    ) : null
}

export default App
