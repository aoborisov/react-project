import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import pogination from '../utils/pogination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import TableUsers from './tableUsers'
import _ from 'lodash'
import API from '../api/index'

const UsersList = () => {
    const initialState = API.users.fetchAll()
    const [users, setUsers] = useState()
    const [professions, setProfessions] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [activePage, setActivePage] = useState(1)
    const [selectedProfession, setSelectedProfession] = useState()
    useEffect(() => initialState.then((data) => setUsers(data)), [])
    useEffect(
        () =>
            API.professions.fetchAll().then((data) => {
                setProfessions(data)
            }),
        []
    )

    if (users) {
        const pageSize = 4

        const uersFiltered = selectedProfession
            ? users.filter(
                  (user) => user.profession._id === selectedProfession._id
              )
            : users
        const count = users ? uersFiltered.length : 0
        const pagesCount = Math.ceil(count / pageSize)

        const usersSorted = _.orderBy(
            uersFiltered,
            [sortBy.path],
            [sortBy.order]
        )

        const usersCrop = pogination(usersSorted, activePage, pageSize)

        const handlePageChange = (pageNumber) => {
            setActivePage(pageNumber)
        }

        const handleProfessionSelect = (data) => {
            setSelectedProfession(data)
        }

        const handleResetProfessin = () => {
            setSelectedProfession()
        }

        const handleSort = (data) => {
            setSortBy(data)
        }

        const handleBookmark = (id) => {
            const newUsers = users.map((user) => {
                if (user._id === id) {
                    if (user.bookmark === false) {
                        user.bookmark = true
                    } else {
                        user.bookmark = false
                    }
                }

                return user
            })

            setUsers(newUsers)
        }

        const handleDelete = (id) => {
            const newUsers = users.filter((user) => user._id !== id)
            setUsers(newUsers)
        }

        if (activePage > pagesCount) handlePageChange(activePage - 1)

        function renderPhrase() {
            if (users.length > 0) {
                return (
                    <>
                        <div className="d-flex">
                            {professions && (
                                <div className="d-flex flex-column p-3">
                                    <GroupList
                                        items={professions}
                                        onItemSelect={handleProfessionSelect}
                                        idProperty={'_id'}
                                        nameProperty={'name'}
                                        selectedItems={selectedProfession}
                                    />
                                    <button
                                        className="btn btn-secondary mt-2 w-100"
                                        onClick={handleResetProfessin}
                                    >
                                        Сброс
                                    </button>
                                </div>
                            )}
                            <div className="d-flex flex-fill flex-column me-3">
                                <div className="pt-3">
                                    <SearchStatus users={uersFiltered} om />
                                </div>
                                <TableUsers
                                    usersCrop={usersCrop}
                                    onDelete={handleDelete}
                                    onBookmark={handleBookmark}
                                    sortBy={sortBy}
                                    onSort={handleSort}
                                />
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemActive={activePage}
                                        pagesCount={pagesCount}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )
            } else {
                return <></>
            }
        }

        return renderPhrase()
    } else {
        return <div>Loading</div>
    }
}

export default UsersList
