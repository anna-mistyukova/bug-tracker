class User {
  constructor (props) {
  	const { name } = props

  	this.id = generateId()
  	this.name = name
  }
}

function generateId () {
  return Math.random()
}

export default User
