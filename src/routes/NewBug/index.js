import React, { Component } from 'react'
import { Container, Table, Row, Col, Card, Button } from 'react-bootstrap'

class NewBug extends Component {
  static DEFAULT_MODEL = {
    shortDescription: '',
    fullDescription: '',
    statusId: '',
    priorityId: '2',
    importanceId: '2'
  }

  state = { 
  	model: NewBug.DEFAULT_MODEL,
  	isValid: false
  }

  onChange = (e) => {
  	const { value, name } = e.currentTarget
  	const { model } = this.state
    
    this.setState({ 
     model: { ...model, [name]: value } 
    })

    this.validate()
  }

  onCreate = () => {
    const { onCreate } = this.props

    onCreate(this.state.model)
  }

  onClear = () => {
    this.setState({
      model: NewBug.DEFAULT_MODEL,
      isValid: false
    })
  }

  validate = () => {
    const { model } = this.state

    const isValid = model.shortDescription && model.fullDescription && 
      (model.priorityId || model.priorityId === 0) &&
      (model.importanceId || model.importanceId === 0)
   
    this.setState({
      isValid
    })
  }

  render () {
  	const { isValid, model } = this.state

    return (
      <Container>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>
               <h2 className='bold'>Новая ошибка</h2>
              </Card.Title>
            <div className='bold'>Приоритет</div>
            <select name='priorityId' value={model.priorityId} onChange={this.onChange}>
              <option value='0'>Очень высокий</option>
              <option value='1'>Высокий</option>
              <option value='2'>Средний</option>
              <option value='3'>Низкий</option>
            </select>
            <div className='bold'>Серьезность</div>
            <select name='importanceId' value={model.importanceId} onChange={this.onChange}>
              <option value='0'>Очень высокий</option>
              <option value='1'>Высокий</option>
              <option value='2'>Средний</option>
              <option value='3'>Низкий</option>
            </select>
            <div className='bold'>Краткое описание</div>
            <div>
              <input
                      name='shortDescription'
                      type='textarea'
                      value={model.shortDescription}
                      onChange={this.onChange}
              />
            </div>
            <div className='bold'>Полное описание</div>
            <div>
              <input
                      name='fullDescription'
                      type='textarea'
                      value={model.fullDescription}
                      onChange={this.onChange}
              />
            </div>
            <Button variant='light' onClick={this.onClear}>Отмена</Button>
            <Button variant='primary' disabled={!isValid} onClick={this.onCreate}>Создать</Button>
        </Card.Body>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NewBug
