import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor () {
    app.initializeApp(config)

    this.auth = app.auth()
    this.db = app.database()

    this.bugs().once('value', snapshot => {
      const bugsObject = snapshot.val()

      this.lastBugId = bugsObject
        ? Object.keys(bugsObject)
          .reduce((max, value) => parseInt(value, 10) > max ? parseInt(value, 10) : max, 0)
        : 0
    })
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.db.ref(`users/${this.auth.currentUser.uid}`).once('value')
        .then(snapshot => {
          this.user = snapshot.val()
        })
    })

  doSignOut = () => this.auth.signOut()

  doUpdateProfile = (profile) =>
    this.auth.currentUser.updateProfile(profile)

  user = uid => this.db.ref(`users/${uid}`)

  updateBug = (bugProps) => this.db.ref(`bugs/${bugProps.id}`).set({
    ...bugProps
  })

  reportBug = (bugProps) => {
    const id = this.lastBugId + 1
    const date = Date.now()
    const { uid, displayName } = this.auth.currentUser
    const user = { id: uid, name: displayName }

    return this.db.ref(`bugs/${id}`).set({
      id,
      date,
      user,
      ...bugProps
    }).then(() => {
      this.lastBugId++

      return id
    })
  }

  bug = (bugId) => this.db.ref(`bugs/${bugId}`)

  bugs = () => this.db.ref('bugs')
}

export default Firebase
