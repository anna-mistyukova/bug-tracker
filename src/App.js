import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
import Home from './routes/Home'
import Bug from './routes/Bug'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './App.css'

const App = () => (
  <div className='app-container'>
    <Header />
    <Main />
  </div>
)

const Navigation = () => (
  <Navbar bg='primary' variant='dark' expand='lg'>
    <Navbar.Brand>Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <LinkContainer to='/home'>
          <Nav.Link>
            <span><i className='fas fa-home' /></span>
            <span>Панель ошибок</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/bug'>
          <Nav.Link>Новая ошибка</Nav.Link>
        </LinkContainer>
      </Nav>
      <Button variant='outline-light'>
        <i className='fas fa-sign-out-alt' />
        Выйти
      </Button>
    </Navbar.Collapse>
  </Navbar>
)

const Header = ({ isAuthenticated = true }) => (
  isAuthenticated ? (
    <Navigation />
  ) : (
    <header>
      <nav>
        <div>
          <div>Bug Tracker</div>
        </div>
      </nav>
    </header>
  )
)

const Main = () => (
  <main>
    <Switch>
      <Route path='/login' component={Login} />
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute path='/bugs/:bugId' component={Bug} />
      <PrivateRoute component={NotFound} />
    </Switch>
  </main>
)

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export const fakeAuth = {
  isAuthenticated: false,
  authenticate (cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout (cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

export default App

/*
// setter
localStorage.setItem('myData', data);

// getter
localStorage.getItem('myData');

// remove
localStorage.removeItem('myData');

// remove all
localStorage.clear();
*/

