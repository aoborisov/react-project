import React from 'react'

const SearchStatus = props => {
	return props.users.length > 0 ? (
		<div className="badge bg-primary">
			{props.users.length} человек
			{Number(String(props.users.length).split('').reverse()[0]) >= 2 &&
			Number(String(props.users.length).split('').reverse()[0]) <= 4 &&
			(props.users.length < 10 || props.users.length > 20)
				? 'а'
				: ''}{' '}
			тусанет с тобой сегодня
		</div>
	) : (
		<div className="badge bg-danger">Никто не тусатнет с тобой сегодня</div>
	)
}

export default SearchStatus
