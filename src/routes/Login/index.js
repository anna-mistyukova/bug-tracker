import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { fakeAuth } from '../../App'
import './component_style.css'

class Login extends Component {
  state = {
    isLoginOpen: true,
    isRegisterOpen: false,
    redirectToReferrer: false
  }

  onShowLoginBox = () => {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    })
  }

  onShowRegisterBox = () => {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    })
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />

    return (
      <div className='root-container'>
        <div className='box-container'>
          <div className='box-controller'>
            <div
              className={this.state.isLoginOpen ? 'controller selected-controller' : 'controller'}
              onClick={this.onShowLoginBox}
            >
              Вход
            </div>
            <div
              className={this.state.isRegisterOpen ? 'controller selected-controller' : 'controller'}
              onClick={this.onShowRegisterBox}
            >
              Регистрация
            </div>
          </div>
          { this.state.isLoginOpen && <LoginBox login={this.login} /> }
          { this.state.isRegisterOpen && <RegisterBox login={this.login} /> }
        </div>
      </div>
    )
  }
}

class LoginBox extends Component {
  state = {
    model: {
      username: '',
      password: ''
    },
    isValid: false
  }

  onChange = (e) => {
    this.setState({
      model: {
        ...this.state.model, 
        [e.target.name]: e.target.value
      }
    })

    this.validate()
  }

  login = () => {
    this.props.login()
  }

  validate = () => {
    const { model } = this.state
    const isValid = model.username && model.password

    this.setState({
      isValid
    })
  }

  render () {
    const { model, isValid } = this.state

    return (
      <div className='inner-container'>

        <div className='box'>

          <div className='input-group'>
            <label htmlFor='username'>Имя пользователя</label>
            <input
              type='text'
              name='username'
              value={model.username}
              className='login-input'
              placeholder='Имя пользователя'
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              name='password'
              value={model.password}
              className='login-input'
              placeholder='Пароль'
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <button
            type='button'
            className='login-btn'
            disabled={!isValid}
            onClick={() => this.login()}
          >
            Войти
          </button>

        </div>

      </div>
    )
  }
}

class RegisterBox extends Component {
  state = {
    username: '',
    password: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  register = () => {
    this.props.login()
  }

  render () {
    return (
      <div className='inner-container'>

        <div className='box'>

          <div className='input-group'>
            <label htmlFor='username'>Имя пользователя</label>
            <input
              type='text'
              name='username'
              className='login-input'
              placeholder='Имя пользователя'
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              name='password'
              className='login-input'
              placeholder='Пароль'
              onChange={(e) => this.onChange(e)}
            />
          </div>

          <button
            type='button'
            className='login-btn'
            onClick={() => this.register()}
          >
            Зарегистрироваться
          </button>

        </div>

      </div>
    )
  }
}

export default Login
