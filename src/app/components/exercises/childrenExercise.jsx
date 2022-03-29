import React from 'react'
import CollapseWrapper from '../common/collapse'
import Divider from '../common/divider'
const ChildrenExercise = ({children}) => {
    console.log()
    return (
        <CollapseWrapper title='Упражнение'>
            <p className='mt-3'>
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{' '}
                <code>React.Children.map</code> так и{' '}
                <code>React.Children.toArray</code>
            </p>
            <Divider />

            <ListComponent>
                <Component />
                <Component />
                <Component />
            </ListComponent>
        </CollapseWrapper>
    )
}

const ListComponent = ({children}) => {
    return React.Children.map(children, (chield, index) => (
        <div className='d-flex'>
            <div className='me-2'>{index + 1 + '.'}</div>
            {chield}
        </div>
    ))
}

const Component = () => {
    return <div>Компонент списка</div>
}

export default ChildrenExercise
