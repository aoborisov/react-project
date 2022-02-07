import React from 'react'
import PropTypes from 'prop-types'

const Qualitie = ({ color, name }) => {
    return <span className={`badge bg-${color} m-1`}>{name}</span>
}

Qualitie.propTypes = { color: PropTypes.string, name: PropTypes.string }

export default Qualitie
