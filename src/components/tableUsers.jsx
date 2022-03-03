import React from 'react'
import TableBody from './tableBody'
import TableHeader from './tableHeader'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const TableUsers = ({ usersCrop, onDelete, onBookmark, sortBy, onSort }) => {
    const history = useHistory()
    const tableUsersColumn = {
        name: {
            path: 'name',
            title: 'Имя',
            component: (item) => {
                return (
                    <span
                        type="button"
                        onClick={() => history.push(`/users/${item._id}`)}
                    >
                        {item.name}
                    </span>
                )
            }
        },
        qualities: {
            title: 'Качество',
            component: (item) => {
                return <QualitiesList item={item} />
            }
        },
        profession: { path: 'profession.name', title: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            title: 'Встретился, раз'
        },
        rate: { path: 'rate', title: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            title: 'Избранное',
            component: (user) => {
                return (
                    <Bookmark
                        isActive={user?.bookmark}
                        userId={user._id}
                        onBookmark={onBookmark}
                    />
                )
            }
        },
        delete: {
            component: (user) => {
                return (
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-user-id={user._id}
                        onClick={() => {
                            onDelete(user._id)
                        }}
                    >
                        Удалить
                    </button>
                )
            }
        }
    }

    const handleSort = (sort) => {
        onSort(
            sortBy.path === sort
                ? { path: sort, order: sortBy.order === 'asc' ? 'desc' : 'asc' }
                : { path: sort, order: 'asc' }
        )
    }

    return (
        <Table
            tableUsersColumn={tableUsersColumn}
            onHandleSort={handleSort}
            sortBy={sortBy}
            usersCrop={usersCrop}
        >
            <TableHeader
                tableUsersColumn={tableUsersColumn}
                onHandleSort={handleSort}
                sortBy={sortBy}
            />
            <TableBody
                usersCrop={usersCrop}
                tableUsersColumn={tableUsersColumn}
            />
        </Table>
    )
}

TableUsers.propTypes = {
    usersCrop: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func,
    sortBy: PropTypes.object,
    onSort: PropTypes.func
}

export default TableUsers
