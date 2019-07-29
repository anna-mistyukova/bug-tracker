import React, { Component } from 'react'
import { Container, Table, Row, Col, Card, Button } from 'react-bootstrap'

class Bug extends Component {
  render () {
    const id = 12345
    const creator = { id: 123, name: 'John' }
    const shortDescription = 'Что-то пошло не так'
    const fullDescription = 'В загодочном лесу на берегу берега березовой страны пропали все березы.'
    const date = '12/07/19'
    const comment = ''

    return (
      <Container>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>
               <h2 className='bold'>Ошибка</h2>
                <h2 className='bold'>{ `#${id}` }</h2>
              </Card.Title>
              <Card.Subtitle className='text-muted'>
              <div>
                <span>Дата создания</span>
                <span>{ date }</span>
              </div>
              <div>
                <span>Автор</span>
                <span>{ creator.name }</span>
              </div>
              </Card.Subtitle>
            <div className='bold'>Статус</div>
            <div>Кнопка перевода в какой-либо статус</div>
            <div className='bold'>Комментарий</div>
            <div className='lighter smaller'>Пожалуйста, укажите объяснение к изменению статуса</div>
            <div><input type='textarea' value={comment} /></div>
            <div className='bold'>Приоритет</div>
            <div>Приориете</div>
            <div className='bold'>Серьезность</div>
            <div>Серьезность</div>
            <div className='bold'>Краткое описание</div>
            <div>{shortDescription}</div>
            <div className='bold'>Полное описание</div>
            <div>{fullDescription}</div>
            <Button variant='light'>Отмена</Button>
            <Button variant='primary'>Сохранить</Button>
        </Card.Body>
          </Col>
          <Col>
            <h4>История изменений</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Действие</th>
                  <th>Комментарий</th>
                  <th>Пользователь</th>
                </tr>
              </thead>
          <tbody>
            <tr>
              <td>13/07/19</td>
              <td>Закрытие</td>
              <td>-</td>
              <td>John</td>
            </tr>
            <tr>
              <td>12/07/19</td>
              <td>Решение</td>
              <td>-</td>
              <td>Michael</td>
            </tr>
          </tbody>
        </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Bug
