import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import initialState from './store/initialState'

const store = configureStore(initialState)

document.addEventListener('DOMContentLoaded', () => {
	const root = document.createElement('div')
	root.setAttribute('id', 'root')
	document.body.appendChild(root)
	render(
		<Provider store={store}>
			<App />
		</Provider>
	, root)
})
