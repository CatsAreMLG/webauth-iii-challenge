import React from 'react'
import axios from 'axios'

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
    const headers = {
      authorization: this.props.token
    }
    const endpoint = 'http://localhost:9090/api/users'
    axios
      .get(endpoint, { headers })
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
            <div key={user + i}>{user.username}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default Users
