import React from 'react'
import axios from 'axios'

import requiresAuth from './requiresAuth'

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    this.loadUsers()
  }
  loadUsers = _ => {
    axios
      .get('/')
      .then(res => {
        this.setState({ users: res.data })
      })
      .catch(e => console.log(e.response.data.error))
  }
  render() {
    return (
      <div>
        <div>
          {this.state.users.map((user, i) => (
            <div key={user + i}>
              {user.username}, {user.department}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default requiresAuth(Users)
