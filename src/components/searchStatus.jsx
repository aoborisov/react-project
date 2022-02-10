import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ users }) => {
    if (users.length > 0) {
        return (
            <div className="badge bg-primary p-2">
                {users.length} человек
                {Number(String(users.length).split('').reverse()[0]) >= 2 &&
                Number(String(users.length).split('').reverse()[0]) <= 4 &&
                (users.length < 10 || users.length > 20)
                    ? 'а'
                    : ''}
                тусанет с тобой сегодня
            </div>
        )
    } else {
        return (
            <div className="badge bg-danger">
                Никто не тусатнет с тобой сегодня
            </div>
        )
    }
}

SearchStatus.propTypes = {
    users: PropTypes.array.isRequired
}

export default SearchStatus
