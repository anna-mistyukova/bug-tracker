import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Firebase, { FirebaseContext } from './components/Firebase'

import App from './App'
import './index.sass'

ReactDOM.render((
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>
), document.getElementById('root'))
