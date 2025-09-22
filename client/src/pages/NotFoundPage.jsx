import React from 'react'
import {Link} from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center h-screen *bg-gray-100 dark:bg-gray-900'>
      <div className='absolute p-2 text-sm font-medium text-blue-600 bg-blue-100 rounded cursor-pointer top-4 left-4 hover:bg-blue-200'>
        <Link to="/" className='flex items-center gap-1'>
        <p>Go back</p>
        </Link>
      </div>
      <div className='text-3xl font-bold text-gray-700 dark:text-gray-300'>
        <h1>404-NOT FOUND🥲</h1>
      </div>
    </div>
  )
}

export default NotFoundPage