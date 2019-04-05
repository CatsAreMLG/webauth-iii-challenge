import React from 'react'
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  inputHandler = e => {
    let value = e.target.value
    this.setState({ [e.target.name]: value })
  }
  submit = e => {
    e.preventDefault()
    const { username, password } = this.state
    axios
      .post(`http://localhost:9090/api/users/login`, { username, password })
      .then(res => {
        this.props.setToken(res.data.token)
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
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login
