import React, { Component } from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'

import Users from './components/Users'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

class App extends Component {
  state = {
    token: ''
  }
  componentDidMount() {
    this.state.token === '' && this.props.history.push('/login')
  }
  setToken = token => {
    localStorage.setItem('jwt', token)
    this.setState({ token })
    this.props.history.push('/users')
  }
  logout = _ => {
    localStorage.removeItem('jwt')
    this.setState({ token: '' })
  }
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/login">Login</NavLink>
            <span> | </span>
            <NavLink to="/register">Register</NavLink>
            {this.state.token !== '' && (
              <>
                <span> | </span>
                <NavLink to="/users">Users</NavLink>
                <span> | </span>
                <button onClick={this.logout}>Logout</button>
              </>
            )}
          </nav>
        </header>
        <Route
          path="/login"
          component={props => <Login {...props} setToken={this.setToken} />}
        />
        <Route
          path="/register"
          component={props => <Register {...props} setToken={this.setToken} />}
        />
        <Route
          path="/users"
          component={props => <Users {...props} token={this.state.token} />}
        />
      </div>
    )
  }
}

export default withRouter(App)
