import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup () {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      })
    })

    try {
      const json = await response.json()
      console.log(json)

      if (!json.success) {
        alert(' ⚠ Enter valid Credentials!')
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
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Enter name"
              name="name"
              value={ credentials.name }
              onChange={onChange}
            />
          </div>
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
          <div className="form-group mb-3">
            <label htmlFor="exampleInputAddress1">Address</label>
            <input
              type="address"
              className="form-control"
              id="exampleInputAddress1"
              aria-describedby="addressHelp"
              placeholder="Enter address"
              name="location"
              value={ credentials.location }
              onChange={onChange}
            />
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
        </form>
      </div>
    </>
  )
}
