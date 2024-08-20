import React from 'react'
import { Link } from 'react-router-dom'

function NavLinks() {
  return (
    <div className=''>
      <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/#about">
        About
      </Link>
      <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/#services">
        Services
      </Link>
      <Link className="px-4 font-extrabold text-gray-400 hover:text-white" to="/contact">
        Contact Us
      </Link>
      <Link className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" to="/register">
        Get Started
      </Link>
    </div>
  )
}

export default NavLinks
