import React from 'react'

const Login = props => {
  return (
    <div>
      <form>
        <div>
          Username:
          <input type="text" />
        </div>
        <div>
          Password:
          <input type="password" />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
