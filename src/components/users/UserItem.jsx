import React from 'react';
import {Link} from 'react-router-dom';

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
		</div>
	</div>
  )
}

export default UserItem;