import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
    items,
    onItemSelect,
    idProperty,
    nameProperty,
    selectedItems
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((profession) => (
                <li
                    className={
                        'list-group-item text-center' +
                        (selectedItems === items[profession] ? ' active' : '')
                    }
                    role="button"
                    key={items[profession][idProperty]}
                    onClick={() => {
                        onItemSelect(items[profession])
                    }}
                >
                    {items[profession][nameProperty]}
                </li>
            ))}
        </ul>
    )
}
GroupList.defaultProps = {
    idProperty: '_id',
    nameProperty: 'name'
}
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onItemSelect: PropTypes.func.isRequired,
    idProperty: PropTypes.string,
    nameProperty: PropTypes.string,
    selectedItems: PropTypes.object
}

export default GroupList
