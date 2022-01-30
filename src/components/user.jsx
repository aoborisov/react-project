import React from 'react'
import Bookmark from './bookmark'
import Qualitie from './qualitie'

const User = props => {
	return (
		<tr key={props.user._id}>
			<td>{props.user.name}</td>
			<td>
				{props.user.qualities.map(qualitie => {
					return <Qualitie key={qualitie._id} {...qualitie} />
				})}
			</td>
			<td>{props.user.profession.name}</td>
			<td>{props.user.completedMeetings}</td>
			<td>{props.user.rate}/5</td>
			<td>
				<Bookmark
					isActive={props.user?.bookmark}
					userId={props.user._id}
					onBookmark={props.onBookmark}
				/>
			</td>
			<td>
				<button
					type="button"
					className="btn btn-danger"
					data-user-id={props.user._id}
					onClick={function () {
						props.onDelete(props.user._id)
					}}
				>
					delete
				</button>
			</td>
		</tr>
	)
}

export default User
