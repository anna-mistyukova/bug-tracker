import React, { Component } from 'react'
import Bug from '../../entities/Bug'
import { Container, Form, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { withAuthorization } from '../../components/Session'
import { withFirebase } from '../../components/Firebase'

class NewBug extends Component {
  static DEFAULT_MODEL = {
    shortDescription: '',
    fullDescription: '',
    priorityId: Bug.DEFAULT_PRIORITY,
    importanceId: Bug.DEFAULT_IMPORTANCE,
    statusId: Bug.DEFAULT_STATUS
  }

  state = {
    model: NewBug.DEFAULT_MODEL,
    isValid: false,
    redirect: false,
    error: null
  }

  onChange = (prop, value) => {
    const { model } = this.state

    this.setState({
      model: { ...model, [prop]: value }
    }, () => {
      this.validate()
    })
  }

  onCreate = () => {
    const { model } = this.state
    const { firebase } = this.props
    const { uid, displayName } = firebase.auth.currentUser

    const bug = {
      ...model,
      history: [
        {
          date: Date.now(),
          type: Bug.DEFAULT_ACTION_TYPE,
          comment: '',
          user: { id: uid, name: displayName }
        }
      ]
    }

    firebase.reportBug(bug)
      .then((bugId) => {
        this.setState({
          redirect: true,
          bugId
        })
      }).catch(error => {
        this.setState({
          error
        })
      })
  }

  onClear = () => {
    this.setState({
      model: NewBug.DEFAULT_MODEL,
      isValid: false
    })
  }

  validate = () => {
    const { model } = this.state

    const isValid = model.shortDescription &&
      (model.priorityId || model.priorityId === 0) &&
      (model.importanceId || model.importanceId === 0)

    this.setState({
      isValid
    })
  }

  render () {
    const { isValid, model, redirect, bugId, error } = this.state

    if (redirect) {
      return <Redirect
        to={{
          pathname: `/bugs/${bugId}`,
          state: { from: this.props.location }
        }}
      />
    }

    return (
      <Container>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>
                <h2 className='bold'>Новая ошибка</h2>
              </Card.Title>

              <Form>
                <Form.Group controlId='newBugForm.PrioritySelect'>
                  <Form.Label>Приоритет <span className='asterisk'>*</span></Form.Label>
                  <Form.Control
                    as='select'
                    name='priorityId'
                    value={model.priorityId}
                    onChange={(e) => this.onChange('priorityId', e.currentTarget.value)}
                  >
                    { Object.keys(Bug.PRIORITIES).map(priorityId => (
                      <option key={priorityId} value={priorityId}>{ Bug.PRIORITIES[priorityId] }</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='newBugForm.ImportanceSelect'>
                  <Form.Label>Важность <span className='asterisk'>*</span></Form.Label>
                  <Form.Control
                    as='select'
                    name='importanceId'
                    value={model.importanceId}
                    onChange={(e) => this.onChange('importanceId', e.currentTarget.value)}
                  >
                    { Object.keys(Bug.IMPORTANCES).map(importanceId => (
                      <option key={importanceId} value={importanceId}>{ Bug.IMPORTANCES[importanceId] }</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='newBugForm.ShortDescriptionTextarea'>
                  <Form.Label>Краткое описание <span className='asterisk'>*</span></Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='shortDescription'
                    value={model.shortDescription}
                    onChange={(e) => this.onChange('shortDescription', e.currentTarget.value)}
                  />
                </Form.Group>
                <Form.Group controlId='newBugForm.FullDescriptionTextarea'>
                  <Form.Label>Полное описание</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows='3'
                    name='fullDescription'
                    value={model.fullDescription}
                    onChange={(e) => this.onChange('fullDescription', e.currentTarget.value)}
                  />
                </Form.Group>
              </Form>

              { error && <Alert variant='danger'>{ error.message} </Alert> }

              <div className='form-controls float-right'>
                <Button variant='light' onClick={this.onClear}>Отмена</Button>
                <Button variant='primary' disabled={!isValid} onClick={this.onCreate}>Создать</Button>
              </div>
            </Card.Body>
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(withFirebase(NewBug))
