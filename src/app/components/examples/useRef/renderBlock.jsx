import React, {useRef, useState} from 'react'
import CardWrapper from '../../common/Card'
import Divider from '../../common/divider'

const RenderBlock = () => {
    const labelRef = useRef()
    const [, setRender] = useState(true)

    const handleChangeLabel = () => {
        labelRef.current.innerText = 'Work'
        labelRef.current.style.height = '150px'
        labelRef.current.style.width = '80px'
        console.log(labelRef)
        setRender(prevState => !prevState)
    }

    return (
        <CardWrapper>
            <div ref={labelRef}>
                <div>Test</div>
            </div>
            <Divider />
            <button className='btn btn-primary' onClick={handleChangeLabel}>
                Изменить
            </button>
        </CardWrapper>
    )
}

export default RenderBlock
