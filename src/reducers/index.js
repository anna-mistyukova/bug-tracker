const INITIAL_STATE = {}

/* ACTION TYPES */
const ON_CREATE_BUG = 'ON_CREATE BUG'
const ON_BUG_STATUS_UPDATE = 'ON_BUG_STATUS_UPDATE'

/* ACTION CREATORS */
const _onCreateBug = (props) => ({
  type: ON_CREATE_BUG,
  payload: { ...props }
})

const onCreateBug = (props) => (dispatch, getState) => {
  // getCurrentUser from content or state
  // create new one from class Bug

  dispatch(_onCreateBug(props))

  // getter
  const bugs = localStorage.getItem('bugs')
  const newBugs = bugs.concat(props)

  // setter
  localStorage.putItem('bugs', newBugs)

  /* 
    1.Local storage udate
    2.Route update to /bugs/:bugId

    (getting bugId from response)
   */
}

const _onBugStatusUpdate = ({ bugId, statusId }) => ({
  type: ON_BUG_STATUS_UPDATE,
  payload: { bugId, statusId }
})

const STATUS_STATES = {
  '0': { name: 'Новая', allowedStateIds: ['1'] },
  '1': { name: 'Открытая', allowedStateIds: ['2'] },
  '2': { name: 'Решенная', allowedStateIds: ['2', '3'] },
  '3': { name: 'Закрытая', allowedStateIds: [] }
}

export const onBugStatusUpdate = ({ bugId, statusId }) => (dispatch, getState) => {
  const state = getState()
  const isAllowed = isAllowedStatusChange(bugId, statusId)

  if (!isAllowed) return

  dispatch(_onBugStatusUpdate({ bugId, statusId }))
  
  /* update local storage ? или в какой части его следует обновлять? */
}

const rootReducer = (state = INITIAL_STATE, action) {
  switch (action.type) {
  	default:
  	  return state
  }
}

export default rootReducer