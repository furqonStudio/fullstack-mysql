import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditUser = () => {
  const notify = () => {
    toast.success('User successfully edited!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Male')
  const navigate = useNavigate()

  const getUserById = async () => {
    const { data } = await axios.get(`http://localhost:3000/users/${id}`)
    setName(data.name)
    setEmail(data.email)
    setGender(data.gender)
  }

  useEffect(() => {
    getUserById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateUser = async (e) => {
    e.preventDefault()

    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        name,
        email,
        gender,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-8">Form Edit User</h1>
      <form className="mt-8 max-w-md mx-auto" onSubmit={updateUser}>
        <div className="mb-4">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="label">
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="input"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex justify-end mt4">
          <button
            type="submit"
            onClick={notify}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
          >
            Edit User
          </button>
          <Link
            to={'/'}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl ml-2"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditUser
