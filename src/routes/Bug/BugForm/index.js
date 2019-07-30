import React, { Component } from 'react'
import BugModel from '../../../entities/Bug'
import { Alert, Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { withFirebase } from '../../../components/Firebase'

class BugForm extends Component {
  constructor (props) {
    super(props)

    const { bugProps } = props

    this.bug = bugProps

    this.state = {
      model: Object.assign({}, bugProps),
      error: null,
      isValid: true,
      loading: false,
      availableStatusIds: BugModel.getAvailableStatusIds(bugProps.statusId)
    }
  }

  onSubmit = () => {
    const { model } = this.state
    const { firebase } = this.props
    const { uid, displayName } = firebase.auth.currentUser
    const history = [...model.history, {
      date: Date.now(),
      type: model.statusId,
      comment: model.comment,
      user: { id: uid, name: displayName }
    }]

    firebase.updateBug({ ...model, history })
      .then(() => {
        const availableStatusIds = model.statusId === this.bug.statusId
          ? this.state.availableStatusIds
          : BugModel.getAvailableStatusIds(model.statusId)

        this.bug = { ...model }

        this.setState({
          model: Object.assign({}, model),
          isValid: true,
          error: null,
          loading: false,
          availableStatusIds
        })
      }).catch(error => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  onClear = () => {
    this.setState({
      model: Object.assign({}, this.bug),
      error: null,
      isValid: false
    })
  }

  onChange = (prop, value) => {
    this.setState({
      model: {
        ...this.state.model,
        [prop]: value
      }
    }, () => {
      this.validate()
    })
  }

  validate = () => {
    const { model } = this.state

    const isValid = model.statusId !== this.bug.statusId && model.comment

    this.setState({
      isValid
    })
  }

  render () {
    const { model, error, isValid, availableStatusIds } = this.state
    const canEditProps = false

    const statusControls = [
      <ToggleButton key={this.bug.statusId} value={this.bug.statusId}>
        { BugModel.STATUS_STATES[this.bug.statusId].name }
      </ToggleButton>,
      ...availableStatusIds.map(statusId => (
        <ToggleButton key={statusId} value={statusId}>
          { BugModel.STATUS_STATES[statusId].name }
        </ToggleButton>
      ))
    ]

    const priorities = Object.keys(BugModel.PRIORITIES)
      .map(priorityKey => {
        const priorityId = parseInt(priorityKey, 10)

        return (
          <option key={priorityId} value={priorityId}>
            { BugModel.PRIORITIES[priorityId] }
          </option>)
      })

    const importanceOptions = Object.keys(BugModel.IMPORTANCES)
      .map(importanceKey => {
        const importanceId = parseInt(importanceKey, 10)

        return (
          <option key={importanceId} value={importanceId}>
            { BugModel.IMPORTANCES[importanceId] }
          </option>
        )
      })

    return (
      <div className='block'>
        <Form name='bugForm'>
          <Form.Group>
            <label>Статус</label>
            <div>
              <ToggleButtonGroup
                type='radio'
                value={model.statusId}
                name='statusId'
                size='sm'
                onChange={(value) => this.onChange('statusId', value)}
              >
                { statusControls }
              </ToggleButtonGroup>
            </div>
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Приоритет</Form.Label>
            <Form.Control
              as='select'
              name='priorityId'
              value={model.priorityId}
              disabled={!canEditProps}
              onChange={(e) => this.onChange('priorityId', e.currentTarget.value)}
            >
              { priorities }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Важность</Form.Label>
            <Form.Control
              as='select'
              name='importanceId'
              value={model.importanceId}
              disabled={!canEditProps}
              onChange={(e) => this.onChange('importanceId', e.currentTarget.value)}
            >
              { importanceOptions }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Краткое описание</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='shortDescription'
              value={model.shortDescription}
              disabled={!canEditProps}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Полное описание</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='fullDescription'
              value={model.fullDescription}
              disabled={!canEditProps}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Комментарий <span className='asterisk'>*</span></Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='comment'
              value={model.comment}
              onChange={(e) => this.onChange('comment', e.currentTarget.value)}
            />
          </Form.Group>

          { error && <Alert variant='danger'>{error.message}</Alert> }

          <div className='form-controls float-right'>
            <Button variant='light' onClick={this.onClear}>Отмена</Button>
            <Button variant='primary' onClick={this.onSubmit} disabled={!isValid}>Сохранить</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default withFirebase(BugForm)
