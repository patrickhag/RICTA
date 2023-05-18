import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function AdminLogin() {
  const navigateTo = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function loginAdmin() {
    if (username && password === 'admin') {
      navigateTo('/applicants')
    }
  }

  return (
    <>
      <Header />
      <div
        className='w3-border w3-round-large w3-white'
        style={{ marginTop: '13%', marginLeft: '35%', marginRight: '35%' }}
      >
        <h5 className='w3-padding' style={{ fontWeight: 500 }}>
          Admin login.
        </h5>
        <hr />
        <form className='w3-container' onSubmit={loginAdmin}>
          <p className='w3-padding'>
            <input
              className='w3-input w3-border w3-block w3-round'
              type='text'
              placeholder='🆔 Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </p>
          <p className='w3-padding'>
            <input
              className='w3-input w3-border w3-block w3-round'
              type='password'
              placeholder='🔑 Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </p>
          <button
            type='submit'
            className='w3-button w3-block w3-blue w3-hover-blue w3-margin-bottom'
          >
            Sign in
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
