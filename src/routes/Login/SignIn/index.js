import React, { Component } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

const INITIAL_STATE = {
  model: {
    email: '',
    password: ''
  },
  isValid: false,
  error: null
}

class SignIn extends Component {
  state = {
    model: {
      email: '',
      password: ''
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

  onSubmit = (e) => {
    const { firebase } = this.props
    const { model: { email, password } } = this.state

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })

    e.preventDefault()
  }

  validate = () => {
    const { model } = this.state
    const isValid = model.password && model.email

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
                name='password'
                value={model.password}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form>

          { error && <Alert variant='danger'> {error.message }</Alert> }

          <Button
            variant='primary'
            disabled={!isValid}
            onClick={this.onSubmit}
          >
            Войти
          </Button>

        </div>

      </div>
    )
  }
}

export default SignIn
