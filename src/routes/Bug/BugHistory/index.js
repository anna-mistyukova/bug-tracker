import React, { Fragment } from 'react'
import BugModel from '../../../entities/Bug'
import { Table } from 'react-bootstrap'

const BugHistory = ({ history }) => (
  <Fragment>
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
        {
          history.map(action => (
            <tr key={action.date}>
              <td>{ (new Date(action.date)).toLocaleDateString() }</td>
              <td>{ BugModel.ACTION_TYPES[action.type] }</td>
              <td>{ action.comment || '-' }</td>
              <td>{ action.user.name }</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </Fragment>
)

export default BugHistory
