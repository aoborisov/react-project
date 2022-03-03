import React, { useState, useEffect } from 'react'
import Qualitie from './qualitie'
import API from '../api/index'
import { useParams, useHistory } from 'react-router-dom'

const User = () => {
    const { userId } = useParams()
    const [curentUser, setCurentUser] = useState()
    const history = useHistory()

    useEffect(
        () => API.users.getById(userId).then((user) => setCurentUser(user[0])),
        []
    )

    if (curentUser) {
        return (
            <div className="ms-3">
                <h5>{curentUser.name}</h5>
                <div>Профессия: {curentUser.profession.name}</div>
                <div>
                    Качества:
                    {curentUser.qualities.map((qualiti) => (
                        <Qualitie key={qualiti._id} {...qualiti} />
                    ))}
                </div>
                <div>Встретился раз: {curentUser.completedMeetings}</div>
                <div>Рейтинг: {curentUser.rate}</div>
                <button
                    type="button"
                    className="btn btn-secondary p-1 pt-0 pb-0 "
                    onClick={() => history.replace('/users')}
                >
                    Все пользователи
                </button>
            </div>
        )
    } else {
        return <span>Loading</span>
    }
}

export default User
