import React from 'react'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import Home from './routes/Home'
import Bug from './routes/Bug'
import NewBug from './routes/NewBug'
import Navigation from './components/Navigation'
import { Switch, Route } from 'react-router-dom'
import { withAuthentication } from './components/Session'

const App = () => (
  <div className='app-container'>
    <Navigation />
    <Main />
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route path='/login' component={Login} />
      <Route exact path='/' component={Home} />
      <Route path='/bugs/:bugId' component={Bug} />
      <Route path='/bug/' component={NewBug} />
      <Route component={NotFound} />
    </Switch>
  </main>
)

export default withAuthentication(App)
