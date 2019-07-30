import React, { Component } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import { Redirect, withRouter } from 'react-router-dom'
import { withFirebase } from '../../components/Firebase'

import './component_style.sass'

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
          { this.state.isLoginOpen && <SignIn firebase={this.props.firebase} history={this.props.history} /> }
          { this.state.isRegisterOpen && <SignUp firebase={this.props.firebase} history={this.props.history} />}
        </div>
      </div>
    )
  }
}

export default withRouter(withFirebase(Login))
