import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ name, formData, onChange, errors }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleTogleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    return (
        <div className="form-group">
            {!(formData[name].title === '') && (
                <label className="me-3 mt-2" htmlFor={name}>
                    {formData[name].title}
                </label>
            )}
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    type={showPassword ? 'text' : formData[name].type}
                    name={name}
                    value={formData[name].value}
                    onChange={(e) => onChange(e)}
                    placeholder={
                        !(formData[name].title === '') ? '' : `${name}...`
                    }
                />

                {formData[name].type === 'password' && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={handleTogleShowPassword}
                    >
                        <i
                            className={
                                'bi bi-eye' + (showPassword ? '-slash' : '')
                            }
                        ></i>
                    </button>
                )}
            </div>
            {errors[name] && (
                <div className="text-secondary">{errors[name]}</div>
            )}
        </div>
    )
}

TextField.propTypes = {
    name: PropTypes.string,
    formData: PropTypes.object,
    onChange: PropTypes.func,
    errors: PropTypes.object
}

export default TextField
