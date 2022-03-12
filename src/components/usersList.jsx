import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import pogination from '../utils/pogination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import TableUsers from './tableUsers'
import TextField from './textField'
import _ from 'lodash'
import API from '../api/index'

const UsersList = () => {
    const initialState = API.users.fetchAll()
    const [users, setUsers] = useState()
    const [professions, setProfessions] = useState()
    const [formData, setFormData] = useState({
        search: { title: '', type: 'text', value: '' }
    })
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
    useEffect(() => setSelectedProfession(), [formData])

    if (users) {
        const pageSize = 4

        let uersFiltered = {}

        if (selectedProfession) {
            uersFiltered = users.filter(
                (user) => user.profession._id === selectedProfession._id
            )
            console.log(selectedProfession)
        } else {
            uersFiltered = users.filter((user) => {
                const regSearch = new RegExp(
                    formData.search.value.toLocaleLowerCase()
                )
                return regSearch.test(user.name.toLocaleLowerCase())
            })
        }

        const count = users ? uersFiltered.length : 0
        const pagesCount = Math.ceil(count / pageSize)

        const usersSorted = _.orderBy(
            uersFiltered,
            [sortBy.path],
            [sortBy.order]
        )

        const usersCrop = pogination(usersSorted, activePage, pageSize)

        const handleOnChange = (event) => {
            setFormData((prevState) => {
                const newState = { ...prevState }
                newState[event.target.name].value = event.target.value
                const reg = new RegExp(event.target.value)
                console.log(reg)
                return newState
            })
        }

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
                                <div className="pt-3 mb-2">
                                    <SearchStatus users={uersFiltered} om />
                                </div>

                                <TextField
                                    name={'search'}
                                    onChange={handleOnChange}
                                    formData={formData}
                                    errors={{}}
                                />

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
        return <div className="m-3">Loading...</div>
    }
}

export default UsersList
