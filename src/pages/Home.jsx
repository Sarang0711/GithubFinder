import React from 'react';
import UserResult from '../components/users/UserResult';
import SearchUsers from '../components/users/SearchUsers';

function Home() {
  return (
    <div>
      {/* <h1 className="text-6xl text-primary-content">Welcome</h1> */}
      <SearchUsers />
      <UserResult />
      
    </div>
  )
}

export default Home