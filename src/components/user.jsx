import React from 'react'
import Bookmark from './bookmark'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'

const User = ({ user, onBookmark, onDelete }) => {
    return (
        <tr className="align-middle" key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qualitie) => {
                    return <Qualitie key={qualitie._id} {...qualitie} />
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <Bookmark
                    isActive={user?.bookmark}
                    userId={user._id}
                    onBookmark={onBookmark}
                />
            </td>
            <td>
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
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object,
    onBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default User
