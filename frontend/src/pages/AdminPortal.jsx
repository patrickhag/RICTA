import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function AdminPortal() {
  const [allApplicants, setAllApplicants] = useState([])

  const getAllApplicants = async () => {
    const res = await fetch('http://localhost:9000/api/admin')
    const data = await res.json()
    setAllApplicants(data.student)
    return data
  }

  useEffect(() => {
    return () => {
      getAllApplicants()
    }
  }, [])

  return (
    <div className='w3-container'>
      <h2>All applicants</h2>

      <table className='w3-table w3-border w3-centered'>
        <thead>
          <tr className='w3-border'>
            <th>Email</th>
            <th>Address</th>
            <th>Date created</th>
            <th>Description</th>
          </tr>
        </thead>

        <AllApplicantsElements allApplicants={allApplicants} />
      </table>
    </div>
  )
}

function AllApplicantsElements({ allApplicants }) {
  function acceptApplicant(id) {
    const data = new FormData()
    data.set('id', id)
    fetch('http://localhost:9000/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
  }
  //
  function rejectApplicant() {
    console.log(456)
  }
  return (
    <tbody>
      {allApplicants?.map(applicant => (
        <tr key={applicant.email}>
          <td>{applicant.email}</td>
          <td>{applicant.address}</td>
          <td>{format(new Date(applicant.date), 'MMM d, yyyy HH:mm')}</td>
          <td>{applicant.description}</td>
          <td>
            <i
              className='fa fa-check w3-button w3-hover-green w3-round'
              title='Accept'
              onClick={() => acceptApplicant(applicant._id)}
            ></i>
            <i
              className='fa fa-times w3-button w3-hover-red w3-round'
              title='Reject'
              onClick={rejectApplicant}
            ></i>
          </td>
        </tr>
      ))}
    </tbody>
  )
}
