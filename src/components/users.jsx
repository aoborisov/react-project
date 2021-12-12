import React, {useState} from 'react'
import API from '../api/index'

const Users = () => {
	const [users, setUsers] = useState(API.users.fetchAll())

	function renderPhrase() {
		return users.length > 0 ? (
			<>
				<div className="badge bg-primary">
					{users.length} человек
					{Number(String(users.length).split('').reverse()[0]) >= 2 &&
					Number(String(users.length).split('').reverse()[0]) <= 4 &&
					(users.length < 10 || users.length > 20)
						? 'а'
						: ''}{' '}
					тусанет с тобой сегодня
				</div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Имя</th>
							<th scope="col">Качество</th>
							<th scope="col">Профессия</th>
							<th scope="col">Встретился, раз</th>
							<th scope="col">Оценка</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{getQualities(user.qualities)}</td>
									<td>{user.profession.name}</td>
									<td>{user.completedMeetings}</td>
									<td>{user.rate}/5</td>
									<td>
										<button
											type="button"
											className="btn btn-danger"
											data-user-id={user._id}
											onClick={handleDelete}
										>
											delete
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</>
		) : (
			<div className="badge bg-danger">Никто не тусатнет с тобой сегодня</div>
		)
	}

	function handleDelete(event) {
		const userIdFroDelete = event.target.getAttribute('data-user-id')
		const newUsersArr = users.filter(user => {
			return user._id !== userIdFroDelete
		})
		console.log(
			Number(
				String(users.length - 1)
					.split('')
					.reverse()[0]
			) >= 2 &&
				Number(
					String(users.length - 1)
						.split('')
						.reverse()[0]
				) <= 4
				? 'а'
				: ''
		)
		setUsers(newUsersArr)
	}

	function getQualities(arr) {
		let qualitie = []

		arr.map(element => {
			qualitie.push(
				<span className={`badge bg-${element.color} m-1`} key={element._id}>
					{element.name}
				</span>
			)
		})
		return qualitie
	}

	return renderPhrase()
}

export default Users
