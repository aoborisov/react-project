import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ tableUsersColumn, onHandleSort, sortBy }) => {
    return (
        <thead>
            <tr>
                {Object.keys(tableUsersColumn).map((item) => {
                    return (
                        <th
                            key={item}
                            scope="col"
                            onClick={() =>
                                tableUsersColumn[item].path
                                    ? onHandleSort(tableUsersColumn[item].path)
                                    : undefined
                            }
                        >
                            {tableUsersColumn[item].title
                                ? tableUsersColumn[item].title
                                : ''}
                            {tableUsersColumn[item].path === sortBy.path ? (
                                sortBy.order === 'asc' ? (
                                    <i className="bi bi-caret-up"></i>
                                ) : (
                                    <i className="bi bi-caret-down"></i>
                                )
                            ) : null}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    tableUsersColumn: PropTypes.object.isRequired,
    onHandleSort: PropTypes.func.isRequired,
    sortBy: PropTypes.object.isRequired
}

export default TableHeader
