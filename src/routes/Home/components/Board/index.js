import React, { Component } from 'react'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './component_style.scss'

class Board extends Component {
  render () {
    const { groups, groupsOrder } = this.props
    const kanbanGroups = groupsOrder
      .map(groupId => {
        const group = groups[groupId] || {}

        return <BoardGroup key={groupId} {...group} />
      })

    const emptyGroups = !Object.keys(groups).length

    return (
      <Row>
        {
          (!emptyGroups && kanbanGroups) || (
            <Col><Alert variant='primary'>Нет ошибок</Alert></Col>
          )
        }
      </Row>
    )
  }
}

class BoardGroup extends Component {
  render () {
    const { groupName, cards = [] } = this.props
    const groupCards = cards.map(card => <BoardCard key={card.id} {...card} />)

    return (
      <Col lg={true}>
        <div className='group'>
          <div className='group__header'>
            <div className='bold'>
              <span>{ groupName }</span>
            </div>
            <div className='lighter smaller'>
              { groupCards.length ? `Ошибок ${cards.length}` : 'Нет ошибок' }
            </div>
          </div>
          <div>
            { groupCards }
          </div>
        </div>
      </Col>
    )
  }
}

class BoardCard extends Component {
  render () {
    const { id, shortDescription, fullDescription } = this.props
    const maxFullDescriptionLength = 100
    const truncatedFullDescription = trunc(maxFullDescriptionLength, fullDescription)

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/bugs/${id}`}>{`#${id}`}</Link>
          </Card.Title>
          <Card.Subtitle className='text-muted'>
            { shortDescription }
          </Card.Subtitle>
          <Card.Text>
            <span>{ truncatedFullDescription }</span>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

function trunc (length, str) {
  return (str.length > length) ? str.substr(0, length - 1) + '\u2026' : str
}

export default Board
