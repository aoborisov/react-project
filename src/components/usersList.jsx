import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import User from './user'
import pogination from '../utils/pogination'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api/index'
import SearchStatus from './searchStatus'

const UsersList = ({ users, onDelete, onBookmark }) => {
    const pageSize = 4
    const [activePage, setActivePage] = useState(1)
    const [selectedProfession, setSelectedProfession] = useState()
    const uersFiltered = selectedProfession
        ? users.filter((user) => user.profession._id === selectedProfession._id)
        : users
    const count = uersFiltered.length
    const pagesCount = Math.ceil(count / pageSize)

    const usersCrop = pogination(uersFiltered, activePage, pageSize)
    const [professions, setProfessions] = useState()

    useEffect(
        () =>
            api.professions.fetchAll().then((data) => {
                setProfessions(data)
            }),
        []
    )

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
    }

    const handleProfessionSelect = (data) => {
        setSelectedProfession(data)
    }

    const handleResetProfessin = () => {
        setSelectedProfession()
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
                                <SearchStatus users={uersFiltered} />
                            </div>
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
}

UsersList.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
}

export default UsersList
