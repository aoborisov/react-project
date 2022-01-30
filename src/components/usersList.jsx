import React from 'react'
import User from './user'

const UsersList = props => {
	function renderPhrase() {
		return props.users.length > 0 ? (
			<>
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
						{props.users.map(user => {
							return (
								<User
									key={user._id}
									user={user}
									onDelete={props.onDelete}
									onQualities={props.onQualities}
									onBookmark={props.onBookmark}
								/>
							)
						})}
					</tbody>
				</table>
			</>
		) : (
			<></>
		)
	}

	return renderPhrase()
}

export default UsersList
