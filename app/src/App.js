import React, { Component } from 'react'
import Users from './components/Users'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Register />
        <Login />
        <Users />
      </div>
    )
  }
}

export default App
