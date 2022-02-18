import PropTypes from 'prop-types'
import React from 'react'
import Qualitie from './qualitie'

const QualitiesList = ({ item }) => {
    return item.qualities.map((qualitie) => {
        return <Qualitie key={qualitie._id} {...qualitie} />
    })
}

QualitiesList.propTypes = { item: PropTypes.object.isRequired }

export default QualitiesList
