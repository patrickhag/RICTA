import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Application from "./pages/Application"
import StudentDetails from "./pages/StudentDetails"
import AdminPortal from "./pages/AdminPortal"

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/applications' element={<Application />} />
          <Route path='/applicants' element={<AdminPortal />} />
          <Route path='/students/:id' element={<StudentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
