import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({
    tableUsersColumn,
    onHandleSort,
    sortBy,
    usersCrop,
    children
}) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        tableUsersColumn={tableUsersColumn}
                        onHandleSort={onHandleSort}
                        sortBy={sortBy}
                    />
                    <TableBody
                        usersCrop={usersCrop}
                        tableUsersColumn={tableUsersColumn}
                    />
                </>
            )}
        </table>
    )
}

Table.propTypes = {
    tableUsersColumn: PropTypes.object,
    onHandleSort: PropTypes.func,
    sortBy: PropTypes.object,
    usersCrop: PropTypes.array,
    children: PropTypes.array
}

export default Table
