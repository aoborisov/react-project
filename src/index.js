import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Users from './components/users'

ReactDOM.render(
	<React.StrictMode>
		<Users />
	</React.StrictMode>,
	document.getElementById('root')
)
