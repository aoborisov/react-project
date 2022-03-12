import React, { useState, useEffect } from 'react'
import TextField from '../components/textField'
import validator from '../utils/validator'

const Login = () => {
    const [formData, setFormData] = useState({
        email: { title: 'Email', type: 'text', value: '' },
        password: { title: 'Password', type: 'password', value: '' }
    })
    const [errors, setErrors] = useState({})
    const validatorConfig = {
        email: {
            isRequired: { mesage: 'Это поле обязательно для заполнения' },
            isEmail: { mesage: 'Введенная строка не является email' }
        },
        password: {
            isRequired: { mesage: 'Это поле обязательно для заполнения' },
            isCapital: { mesage: 'Пароль должен содержать заглавную букву' },
            isNumber: { mesage: 'Пароль должен содержать цифру' },
            isLength: { mesage: 'Парольдолжен быть не менее 8 символов' }
        }
    }

    useEffect(() => validete(), [formData])

    const handleOnChange = (event) => {
        setFormData((prevState) => {
            const newState = { ...prevState }
            newState[event.target.name].value = event.target.value
            validete()
            return newState
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValidate = validete()
        if (!isValidate) return
        console.log('send: ', formData)
    }

    const validete = () => {
        setErrors(validator(formData, validatorConfig, errors))
        if (Object.keys(errors).length === 0) return true
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name={'email'}
                            onChange={handleOnChange}
                            formData={formData}
                            errors={errors}
                        />
                        <TextField
                            name={'password'}
                            onChange={handleOnChange}
                            formData={formData}
                            errors={errors}
                        />
                        <button
                            className="btn btn-secondary w-100 mt-3"
                            type="submit"
                            disabled={!(Object.keys(errors).length === 0)}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
