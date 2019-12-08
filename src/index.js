import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import withSocket from './components/AppWithSocket'

const rootElement = document.getElementById('root')

const AppWithSocket = withSocket(App)

ReactDOM.render(<AppWithSocket />, rootElement)
