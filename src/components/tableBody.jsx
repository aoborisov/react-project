import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ usersCrop, tableUsersColumn }) => {
    const renderComponent = (col, item) => {
        if (tableUsersColumn[col].component) {
            if (typeof tableUsersColumn[col].component === 'function') {
                return tableUsersColumn[col].component(item)
            } else {
                return tableUsersColumn[col].component
            }
        } else {
            return _.get(item, tableUsersColumn[col].path)
        }
    }

    return (
        <tbody>
            {usersCrop.map((item) => {
                return (
                    <tr key={item._id}>
                        {Object.keys(tableUsersColumn).map((col) => (
                            <td key={col}>{renderComponent(col, item)}</td>
                        ))}
                    </tr>
                )
            })}
        </tbody>
    )
}

TableBody.propTypes = {
    usersCrop: PropTypes.array.isRequired,
    tableUsersColumn: PropTypes.object.isRequired
}

export default TableBody
