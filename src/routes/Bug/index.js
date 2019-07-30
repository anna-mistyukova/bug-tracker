import React, { Component, Fragment } from 'react'
import Loader from '../../components/Loader'
import BugForm from './BugForm'
import BugHistory from './BugHistory'
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap'
import { withAuthorization } from '../../components/Session'

import './component_style.sass'

class Bug extends Component {
  state = {
    bug: null,
    loading: false,
    error: null
  }

  componentDidMount () {
    const { firebase } = this.props
    const { bugId } = this.props.match.params

    this.setState({ loading: true })

    firebase.bug(bugId).on('value', snapshot => {
      const bug = snapshot.val()

      if (bug) {
        this.setState({
          loading: false,
          bug
        })
      } else {
        this.setState({
          loading: false,
          error: 'Ошибка не найдена'
        })
      }
    })
  }

  render () {
    const { bug, loading, error } = this.state
    const content = loading
      ? <Col><Loader /></Col>
      : error
        ? <Col><Alert variant='danger'>{ error }</Alert></Col>
        : <BugContent bug={bug} />

    return (
      <Container>
        <Row>
          { content }
        </Row>
      </Container>
    )
  }
}

class BugCard extends Component {
  render () {
    const { bug } = this.props
    const date = new Date(bug.date).toLocaleDateString()

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <h2 className='bold'>{ `Ошибка #${bug.id}` }</h2>
          </Card.Title>
          <Card.Subtitle className='text-muted'>
            <div className='sub-block'>
              <Badge pill variant='info'>
                Дата создания
              </Badge>
              <span className='smaller'>{ date }</span>
            </div>

            <div className='sub-block'>
              <Badge pill variant='info'>
                Автор
              </Badge>
              <span className='smaller'>{ bug.user.name }</span>
            </div>
          </Card.Subtitle>
          <BugForm bugProps={bug} />
        </Card.Body>
      </Card>
    )
  }
}

const BugContent = ({ bug }) => (
  bug ? <Fragment>
    <Col>
      <BugCard bug={bug} />
    </Col>
    <Col>
      <BugHistory history={bug.history} />
    </Col>
  </Fragment> : null
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Bug)
