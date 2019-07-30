class Bug {
  static STATUS_STATES = {
    0: { name: 'Новая', allowedStateIds: ['1'], groupName: 'Новые' },
    1: { name: 'Открытая', allowedStateIds: ['2'], groupName: 'Открытые' },
    2: { name: 'Решенная', allowedStateIds: ['1', '3'], groupName: 'Решенные' },
    3: { name: 'Закрытая', allowedStateIds: [], groupName: 'Закрытые' }
  }

  static PRIORITIES = {
    0: 'Очень высокий',
    1: 'Высокий',
    2: 'Средний',
    3: 'Низкий'
  }

  static IMPORTANCES = {
    0: 'Критичная',
    1: 'Значительная',
    2: 'Незначительная',
    3: 'Запрос на изменение'
  }

  static ACTION_TYPES = {
    0: 'Ввод',
    1: 'Открытие',
    2: 'Решение',
    3: 'Закрытие'
  }

  static DEFAULT_STATUS = 0

  static DEFAULT_PRIORITY = 2

  static DEFAULT_IMPORTANCE = 2

  static DEFAULT_ACTION_TYPE = 0

  static getAvailableStatusIds = (statusId) => {
    return this.STATUS_STATES[statusId].allowedStateIds
  }
}

export default Bug
