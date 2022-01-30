import React from 'react'

const Qualitie = props => {
	return <span className={`badge bg-${props.color} m-1`}>{props.name}</span>
}

export default Qualitie
