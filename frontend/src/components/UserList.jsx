import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ToastContainer } from 'react-toastify'

const Userlist = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getUsers = async () => {
    const { data } = await axios.get('http://localhost:3000/users')
    setUsers(data)
  }

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3000/users/${id}`)
      getUsers()

      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-8">Users List</h1>
      <div className="flex justify-end mt-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          className="border border-gray-300 rounded-xl py-2 px-4 "
        />
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-xl ml-auto"
        >
          Add User
        </Link>
      </div>
      <div className="relative overflow-x-auto rounded-lg shadow-sm mt-4 ">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b bg-neutral-100 font-medium">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                className={`${
                  index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'
                } border-b`}
                key={user.id}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td>
                  <Link
                    to={`edit/${user.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer limit={1} />
    </div>
  )
}

export default Userlist
