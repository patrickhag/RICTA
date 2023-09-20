import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Register() {
  const navigateTo = useNavigate()
  const [names, setNames] = useState("")
  const [regno, setRegno] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  async function registerUser(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:9000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        names,
        regno,
        password,
        role,
      }),
    })
    const data = await response.json()
    if (data.status === "ok") {
      alert("Access granted")
      navigateTo("/")
    }
  }

  return (
    <>
      <Header />
      <div
        className='w3-border w3-round-large w3-white'
        style={{ marginTop: "13%", marginLeft: "35%", marginRight: "35%" }}
      >
        <h5 className='w3-padding' style={{ fontWeight: 500 }}>
          Register and get to login.
        </h5>
        <hr />
        <form className='w3-container' onSubmit={registerUser}>
          <p className='w3-padding'>
            <input
              className='w3-input w3-border w3-round'
              type='text'
              placeholder='👨‍💻 Names'
              value={names}
              onChange={e => setNames(e.target.value)}
            />
          </p>
          <p className='w3-padding'>
            <input
              className='w3-input w3-border w3-round'
              type='text'
              placeholder='🆔 Reg No'
              value={regno}
              onChange={e => setRegno(e.target.value)}
            />
          </p>

          <p className='w3-padding'>
            <input
              className='w3-input w3-border w3-round'
              type='password'
              placeholder='🔑 Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </p>
          <p className='w3-padding'>
            <select
              className='w3-select w3-border w3-round'
              onChange={e => setRole(e.target.value)}
              value={role}
            >
              <option>Choose Category</option>
              <option value='USER'>USER</option>
              <option value='ADMIN'>ADMIN</option>
            </select>
          </p>
          <button
            type='submit'
            className='w3-button w3-block w3-blue w3-hover-blue w3-margin-bottom'
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
