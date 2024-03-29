import React from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import AuthUserContext from './context'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount () {
      const { firebase } = this.props

      this.listener = firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push('/login')
          }
        }
      )
    }

    componentWillUnmount () {
      this.listener()
    }

    render () {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(withFirebase(WithAuthorization))
}

export default withAuthorization
