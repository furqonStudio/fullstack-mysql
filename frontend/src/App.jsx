import Userlist from './components/UserList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userlist />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App
