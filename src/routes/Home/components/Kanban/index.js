import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import './component_style.css'

class Kanban extends Component {
  render () {
    const { groups } = this.props
    const kanbanGroups = groups.map(group => <KanbanGroup key={group.id} {...group} />)
    const cardsLength = groups.reduce((len, group) => len + group.cards.length, 0)
    return (
      <Row>
        { (cardsLength && kanbanGroups) || <div>Нет ошибок</div> }
      </Row>
    )
  }
}

class KanbanGroup extends Component {
  render () {
    const { title, cards } = this.props
    const kanbanGroupCards = cards.map(card => <KanbanCard key={card.id} {...card} />)

    return (
      <Col>
        <div className='kanban__group'>
          <div className='kanban__group__header'>
            <div className='kanban__group__header__title bold'>
              <span>{ title }</span>
            </div>
            <div className='kanban__group__header__info lighter smaller'>
              { `Ошибок ${cards.length}` }
            </div>
          </div>
          <div className='kanban__group__body'>
            { kanbanGroupCards }
          </div>
        </div>
      </Col>
    )
  }
}

class KanbanCard extends Component {
  render () {
    const { id, title, description } = this.props

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/bugs/${id}`}>{`#${id}`}</Link>
          </Card.Title>
          <Card.Subtitle className='text-muted'>
            {title}
          </Card.Subtitle>
          <Card.Text>
            { description }
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Kanban
