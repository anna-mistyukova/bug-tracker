class Bug {
  static STATUS_STATES = {
  	'0': { name: 'Новая', allowedStateIds: ['1'] },
    '1': { name: 'Открытая', allowedStateIds: ['2'] },
    '2': { name: 'Решенная', allowedStateIds: ['2', '3'] },
    '3': { name: 'Закрытая', allowedStateIds: [] }
  }

  static PRIORITIES = {
  	'0': 'Очень высокий',
  	'1': 'Высокий',
  	'2': 'Средний',
  	'3': 'Низкий'
  }

  static IMPORTANCES = {
  	'0': 'Критичная',
  	'1': 'Значительная',
  	'2': 'Незначительная',
  	'3': 'Запрос на изменение'
  }

  isStatusAllowed = (statusId) => {
    return Bug.STATUS_STATES[this.statusId].allowedStateIds.indexOf(statusId) !== -1
  }

  constructor (props) {
    const {
      shortDescription,
      fullDescription,
      user,
      statusId,
      priorityId,
      importanceId
    } = props

    const date = Date.now()
    const id = generateId

    this.id = id
    this.date = date
    this.user = user
    this.statusId = statusId
    this.priorityId = priorityId
    this.importance = importanceId
    this.shortDescription = shortDescription
    this.fullDescription = fullDescription
  }
}

function generateId () {
  return Math.random()
}
export default Bug
