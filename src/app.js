import React, { useState } from 'react'
import UsersList from './components/usersList'
import API from './api'
import SearchStatus from './components/searchStatus'

const App = () => {
    const initialState = API.users.fetchAll()
    const [users, setUsers] = useState(initialState)

    function handleDelete(id) {
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

    return (
        <>
            <SearchStatus users={users} />
            <UsersList
                users={users}
                onDelete={handleDelete}
                onBookmark={handleBookmark}
            />
        </>
    )
}

export default App
