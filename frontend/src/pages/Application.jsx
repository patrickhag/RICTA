import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigateTo = useNavigate()
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [department, setDepartment] = useState('')
  const [level, setLevel] = useState('')

  async function sendApplication(e) {
    console.log(123)
    e.preventDefault()
    const response = await fetch('http://localhost:9000/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        address,
        description,
        department,
        level,
      }),
    })
    const data = await response.json()
    if (data.status == 'ok') {
      alert('Access granted')
      navigateTo(`/students/${data.student._id}`)
    }
  }

  return (
    <>
      <Header />

      <div
        className='w3-border w3-round-large w3-white w3-padding'
        style={{ marginTop: '13%', marginLeft: '15%', marginRight: '15%' }}
      >
        <h5 className='w3-padding' style={{ fontWeight: '500' }}>
          Submit the application and get to compete.
        </h5>
        <hr />

        <form onSubmit={sendApplication}>
          <div className='w3-row-padding'>
            <p className='w3-half'>
              <label>Applicant Email</label>
              <input
                className='w3-input w3-border w3-round'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
              />
            </p>
            <p className='w3-half'>
              <label>Applicant Address</label>
              <input
                className='w3-input w3-border w3-round'
                type='text'
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder='Address'
              />
            </p>

            <p className='w3-half'>
              <label>Applicant Department</label>
              <input
                className='w3-input w3-border w3-round'
                type='text'
                value={department}
                onChange={e => setDepartment(e.target.value)}
                placeholder='Department'
              />
            </p>
            <p className='w3-half'>
              <label>Applicant Level</label>
              <input
                className='w3-input w3-border w3-round'
                type='text'
                value={level}
                onChange={e => setLevel(e.target.value)}
                placeholder='Address'
              />
            </p>

            <p className='w3-half'>
              <label>Applicant type</label>
              <input
                className='w3-input w3-border w3-round'
                type='text'
                value='Competition'
                disabled
              />
            </p>
            <p className='w3-half'>
              <label>Applicant Status</label>
              <input
                className='w3-input w3-border w3-round'
                type='text'
                value='Pending  '
                disabled
              />
            </p>
          </div>
          <p style={{ paddingLeft: '8px', paddingRight: '8px' }}>
            <label>Description</label>
            <textarea
              cols='30'
              rows='5'
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='w3-border w3-round w3-block'
              placeholder="Explain the reason for application and don't go more than 100 words."
            ></textarea>
          </p>
          <button type='submit' className='w3-margin w3-btn w3-blue'>
            Submit application
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}
