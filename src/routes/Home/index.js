import React from 'react'
import Kanban from './components/Kanban'
import { Container } from 'react-bootstrap'

const TEST_KANBAN = [
  {
    id: 1,
    title: 'Новые',
    cards: [
      {
        id: 123456,
        title: 'Не работает то',
        description: 'Не работает сё'
      },
      {
        id: 123457,
        title: 'Не работает то',
        description: 'Не работает сё'
      }
    ]
  },
  {
    id: 2,
    title: 'Открытые',
    cards: [
      {
        id: 123458,
        title: 'Не работает то',
        description: 'Не работает сё'
      },
      {
        id: 123459,
        title: 'Не работает то',
        description: 'Не работает сё'
      }
    ]
  },
  {
    id: 3,
    title: 'Решенные',
    cards: [
      {
        id: 123460,
        title: 'Не работает то',
        description: 'Не работает сё'
      },
      {
        id: 123461,
        title: 'Не работает то',
        description: 'Не работает сё'
      }
    ]
  },
  {
    id: 4,
    title: 'Закрытые',
    cards: [
      {
        id: 123462,
        title: 'Не работает то',
        description: 'Не работает сё'
      },
      {
        id: 123463,
        title: 'Не работает то',
        description: 'Не работает сё'
      }
    ]
  }
]

const Home = () => (
  <Container>
    <h2>Ошибки</h2>
    <Kanban groups={TEST_KANBAN} />
  </Container>
)

export default Home
