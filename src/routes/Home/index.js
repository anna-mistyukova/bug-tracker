import React, { Component } from 'react'
import { withAuthorization } from '../../components/Session'
import Board from './components/Board'
import { Container } from 'react-bootstrap'
import Bug from '../../entities/Bug'
import Loader from '../../components/Loader'

class Home extends Component {
  state = {
    loading: false,
    bugGroups: {}
  }

  componentDidMount () {
    const { firebase } = this.props

    this.setState({ loading: true })

    firebase.bugs().on('value', snapshot => {
      const bugsObject = snapshot.val()

      const bugsList = bugsObject
        ? Object.keys(bugsObject).map(key => ({
          ...bugsObject[key],
          uid: key }))
        : []

      const bugGroups = {}

      Object.keys(Bug.STATUS_STATES).forEach(statusKey => {
        bugGroups[statusKey] = {
          groupName: Bug.STATUS_STATES[statusKey].groupName,
          groupId: statusKey,
          cards: bugsList.filter(bug => bug.statusId.toString() === statusKey)
        }
      })

      this.setState({
        bugGroups,
        loading: false
      })
    })
  }

  componentWillUnmount () {
    const { firebase } = this.props

    firebase.bugs().off()
  }

  render () {
    const { bugGroups, loading } = this.state
    const groupsOrder = [0, 1, 2, 3]

    return (
      <Container>
        <h2>Ошибки</h2>
        { !loading ? <Board groups={bugGroups} groupsOrder={groupsOrder} /> : <Loader /> }
      </Container>
    )
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(Home)
