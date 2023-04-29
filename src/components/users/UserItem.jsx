import React from 'react';
import {Link} from 'react-router-dom';

//? In the parameters we are defactoring user object so that we need not to write user.login and user.avatar_url everytime when we need to access these variables
function UserItem({user: {login, avatar_url}}) {
  return (
	<div className='card shadow-md compact side bg-base-100'>
		<div className="flex-row item-center space-x-4 card-body">
			<div>
				<div className="avatar">
					<div className="rounded-full shadow w-14 h-14">
						<img src={avatar_url} alt="profile" />
					</div>
				</div>
			</div>
			<div>
				<h2 className="card-title">{login }</h2>
				<Link className='text-based-content text-opacity-40' to={`/users/${login}`}>Visit Profile</Link>
			</div>
			//@ Need to perform handle visit profile so page will be directed to user's github repository
		</div>
	</div>
  )
}

export default UserItem;