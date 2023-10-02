import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login () {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })

      const json = await response.json()
      console.log(json)

      if (!json.success) {
        alert(' ⚠ Enter valid Credentials!')
      } else {
        alert('Login Successful!')
        setTimeout(() => {
          localStorage.setItem('authToken', json.authToken)
          navigate('/')
        }, 2000)
        console.log(localStorage.getItem('authToken'))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={ credentials.email }
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={ credentials.password }
              onChange={onChange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">Don&apos;t have an account?</Link>
        </form>
      </div>
    </>
  )
}
