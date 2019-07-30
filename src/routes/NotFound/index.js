import React from 'react'
import { withAuthorization } from '../../components/Session'

const NotFound = () => (
  <div>
    Страница не найдена
  </div>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(NotFound)
