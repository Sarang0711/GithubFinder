import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className='hero text-primary-content'>
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-8">Oops!</h1>
        <p className="text-3xl mb-3">404 Page Not Found</p>
        {/* <Link to="/"> */}
          <Link to="/" className="btn btn-primary btn-lg">
            <FaHome className='mr-2'/>
            Back to Home
          </Link>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default NotFound