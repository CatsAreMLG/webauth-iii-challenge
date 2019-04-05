import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    department: ''
  }
  inputHandler = e => {
    let value = e.target.value
    this.setState({ [e.target.name]: value })
  }
  submit = e => {
    e.preventDefault()
    const { username, password, department } = this.state
    axios
      .post(`http://localhost:9090/api/users/register`, {
        username,
        password,
        department
      })
      .then(res1 => {
        axios
          .post(`http://localhost:9090/api/users/login`, {
            username,
            password
          })
          .then(res => {
            this.props.setToken(res.data.token)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              onChange={this.inputHandler}
              value={this.state.username}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              onChange={this.inputHandler}
              value={this.state.password}
            />
          </div>
          <div>
            Department:
            <input
              type="text"
              name="department"
              onChange={this.inputHandler}
              value={this.state.department}
            />
          </div>
          <button>Signup</button>
        </form>
      </div>
    )
  }
}

export default Register
