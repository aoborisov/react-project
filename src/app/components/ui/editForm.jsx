import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import {useParams, useHistory} from 'react-router'

const RegisterForm = () => {
    const history = useHistory()
    const {userId} = useParams()
    const [data, setData] = useState()
    const [qualities, setQualities] = useState({})
    const [professions, setProfession] = useState()
    const [errors, setErrors] = useState({})

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
            isEmail: {
                message: 'Email введен некорректно',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения',
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число',
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8,
            },
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию',
            },
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
            },
        },
    }

    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = e => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
    }

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfession(data))
        api.qualities.fetchAll().then(data => setQualities(data))
        api.users.getById(userId).then(data => {
            setData({
                ...data,
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map(qualitie => {
                    return {value: qualitie._id, label: qualitie.name}
                }),
            })
        })
    }, [])

    const handleUpdate = () => {
        const newQualities = []
        let newProfession = {}

        data.qualities.map(qualitie =>
            Object.keys(qualities).map(qualitieKey => {
                if (qualities[qualitieKey]._id === qualitie.value) {
                    newQualities.push(qualities[qualitieKey])
                }
            })
        )

        Object.keys(professions).map(professionKey => {
            if (professions[professionKey]._id === data.profession) {
                newProfession = {...professions[professionKey]}
            }
        })

        api.users.update(userId, {
            ...data,
            qualities: newQualities,
            profession: newProfession,
        })

        history.push(`/users/${userId}`)
    }

    if (data) {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 shadow p-4'>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Имя'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <TextField
                                label='Электронная почта'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label='Выбери свою профессию'
                                defaultOption='Choose...'
                                options={professions}
                                name='profession'
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    {name: 'Male', value: 'male'},
                                    {name: 'Female', value: 'female'},
                                    {name: 'Other', value: 'other'},
                                ]}
                                value={data.sex}
                                name='sex'
                                onChange={handleChange}
                                label='Выберите ваш пол'
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name='qualities'
                                label='Выберите ваши качества'
                            />

                            <button
                                className='btn btn-primary w-100 mx-auto'
                                type='submit'
                                disabled={!isValid}
                                onClick={handleUpdate}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } else {
        return 'Loading...'
    }
}

export default RegisterForm
