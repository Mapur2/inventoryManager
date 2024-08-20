import React, { useRef, useState } from 'react'
import { userAuth } from '../context/UserContext'

function Profile() {
  const { logout, login, authStatus, user } = userAuth()
  console.log(user)
  const [edit, setEdit] = useState(false)
  const [detail, setDetails] = useState({ ...user })
  const inputRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(detail)
    setEdit(false)
  }

  const logoutUserProfile = async (e) => {
    e.preventDefault()
    await logoutUser()
    logout()
    nav("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto md:max-w-md lg:max-w-lg">
          {/* Profile Picture */}
          <div className="w-32 h-32 mb-4">
            <img
              className="w-full h-full rounded-full object-cover"
              src="https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"
              alt={`${user.fullname}'s profile`}
            />
          </div>
          {/* Name */}
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{user.fullname}</h2>
          {/* Email */}
          <p className="text-gray-600 mb-1">
            <strong>Email: </strong>{user.email}
          </p>
          {/* WhatsApp Number */}
          <p className="text-gray-600 mb-1">
            <strong>WhatsApp: </strong>{user.whatsapp}
          </p>
          {/* Phone Number */}
          <p className="text-gray-600 mb-1">
            <strong>Phone: </strong>{user.phone}
          </p>
          {/* Action Buttons */}
          <p className="text-gray-600 mb-1">
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={logoutUserProfile}
            >
              Logout
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile


