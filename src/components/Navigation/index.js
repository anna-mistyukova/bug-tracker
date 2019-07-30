import React from 'react'
import { withFirebase } from '../Firebase'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { AuthUserContext } from '../Session'

import './component_style.sass'

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      { authUser =>
        authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = ({ user }) => (
  <Navbar bg='primary' variant='dark' expand='lg'>
    <Navbar.Brand>Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <LinkContainer to='/'>
          <Nav.Link>
            <span><i className='fas fa-home' /></span>
            <span>Панель ошибок</span>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/bug'>
          <Nav.Link>Новая ошибка</Nav.Link>
        </LinkContainer>
      </Nav>
      <User user={user} />
      <SignOutButton />
    </Navbar.Collapse>
  </Navbar>
)

const NavigationNonAuth = () => (
  <Navbar bg='primary' variant='dark' expand='lg'>
    <Navbar.Brand>Bug Tracker</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <LinkContainer to='/login'>
          <Nav.Link>Вход</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const SignOutButton = withFirebase(({ firebase }) => (
  <Button variant='outline-light' onClick={firebase.doSignOut}>
    <i className='fas fa-sign-out-alt' />
    Выйти
  </Button>
))

const User = ({ user }) => (
  <div className='user'>
    { `Здравствуйте, ${user.displayName}` }
  </div>
)

export default Navigation
