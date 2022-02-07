import React, { useState } from 'react'
import Pagination from './pagination'
import User from './user'
import pogination from '../utils/pogination'
import PropTypes from 'prop-types'

const UsersList = ({ users, onDelete, onBookmark }) => {
    const count = users.length
    const pageSize = 4
    const pagesCount = Math.ceil(count / pageSize)
    const [activePage, setActivePage] = useState(1)
    const usersCrop = pogination(users, activePage, pageSize)

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
    }

    if (activePage > pagesCount) handlePageChange(activePage - 1)

    function renderPhrase() {
        if (users.length > 0) {
            return (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качество</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => {
                                return (
                                    <User
                                        key={user._id}
                                        user={user}
                                        onDelete={onDelete}
                                        onBookmark={onBookmark}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        itemActive={activePage}
                        pagesCount={pagesCount}
                        onPageChange={handlePageChange}
                    />
                </>
            )
        } else {
            return <></>
        }
    }

    return renderPhrase()
}

UsersList.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default UsersList
