import { useEffect, useState } from "react"
import { useParams } from "react-router"
import spin from "../assets/spn.png"
import Header from "./Header"
import UpdateModal from "./UpdateModal"
import DeleteModal from "./DeleteModal"
import Footer from "./Footer"
import Status from "./Status"

const API_BASE = "http://localhost:9000/api/students"

export default function StudentDetails() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudent()
  }, [])

  const getStudent = async () => {
    try {
      const req = await fetch(`${API_BASE}/${id}`)
      const res = await req.json()
      if (res.ok) {
        setStudent(res.student)
      } else {
        setError(res.error)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const openUpdateModal = () => {
    setShowUpdateModal(true)
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }
  const openStatus = () => {
    setShowStatus(true)
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <UpdateModal
        student={student}
        setStudent={setStudent}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
      {showDeleteModal && (
        <DeleteModal
          id={id}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showStatus && (
        <Status showStatus={showStatus} setShowStatus={setShowStatus} />
      )}

      <div
        className='w3-display-container w3-white'
        style={{ marginTop: "13%", marginLeft: "15%", marginRight: "15%" }}
      >
        <div className='w3-row' style={{ padding: "5%" }}>
          <div className='w3-display-topright' style={{ padding: "inherit" }}>
            <img
              src={spin}
              alt=''
              className=' 
				w3-round-large'
              width='150'
              height='150'
            />
          </div>
          <div className='w3-twothird'>
            <h1>{student.email}</h1>
            <p className='w3-opacity'>
              <b>{student.description}</b>
            </p>
            <p>Created At: {student.date}</p>
            <p>Address : {student.address}</p>
            <br />
            <div>
              <button
                className='w3-col m3 w3-button w3-round'
                onClick={openUpdateModal}
              >
                <i className='w3-xlarge fa fa-edit'></i>
                &nbsp;Edit
              </button>
              <button
                className='w3-col m3 w3-button w3-round w3-margin-left'
                onClick={openDeleteModal}
              >
                <i className='w3-xlarge fa fa-trash'></i>&nbsp;Cancel
              </button>
              <button
                className='w3-col m3 w3-button w3-round w3-margin-left'
                onClick={openStatus}
              >
                <i className='w3-xlarge fa fa-info-circle'></i>&nbsp;Status
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
