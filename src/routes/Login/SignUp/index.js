import React, { Component } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

const INITIAL_STATE = {
  model: {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  },
  isValid: false,
  error: null
}

class SignUp extends Component {
  state = {
    model: {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: ''
    },
    isValid: false,
    error: null
  }

  onChange = (e) => {
    const { name, value } = e.currentTarget

    this.setState({
      model: Object.assign({}, this.state.model, {
        [name]: value
      })
    }, () => this.validate())
  }

  onSubmit = (event) => {
    const { firebase } = this.props
    const { model: { username, email, passwordOne } } = this.state

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        firebase.doUpdateProfile({ displayName: username })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  validate = () => {
    const { model } = this.state
    const isValid = model.username && model.email &&
      model.passwordOne && (model.passwordOne === model.passwordTwo)

    this.setState({
      isValid
    })
  }

  render () {
    const { model, isValid, error } = this.state

    return (
      <div className='inner-container'>

        <div className='box'>
          <Form>
            <Form.Group>
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={model.username}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={model.email}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type='password'
                name='passwordOne'
                value={model.passwordOne}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form>

          <Form>
            <Form.Group>
              <Form.Label>Повторный пароль</Form.Label>
              <Form.Control
                type='password'
                name='passwordTwo'
                value={model.passwordTwo}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form>

          { error && <Alert variant='danger'> {error.message }</Alert> }

          <Button variant='primary' disabled={!isValid} onClick={this.onSubmit}>
            Зарегистрироваться
          </Button>

        </div>

      </div>
    )
  }
}

export default SignUp
