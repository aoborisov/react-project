import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ onPageChange, itemActive, pagesCount }) => {
    const pagesArr = _.range(1, pagesCount + 1)

    if (pagesCount === 1) {
        return null
    } else {
        return (
            <nav className="m-2" aria-label="...">
                <ul className="pagination pagination-sm">
                    {pagesArr.map((pageNumber) => {
                        return (
                            <li
                                className={
                                    'page-item' +
                                    (itemActive === pageNumber
                                        ? ' active'
                                        : null)
                                }
                                aria-current="page"
                                key={pageNumber}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}
Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    itemActive: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired
}

export default Pagination
