import React from 'react';
import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';

function SearchUsers() {
	const [text, setText] = useState('');

	const {users, setUsers, searchUsers} = useContext(GithubContext);
	
	function handleChange(e) {
		setText(e.target.value);
	}

	function handleSearch(e) {
		e.preventDefault();

		if(text === ''){
			alert('Please enter something');
		}
		else{
			// @todo search user
			searchUsers(text);
			setText('');
			console.log(users);
		}
	
	}
	function handleClear() {
		setUsers([]);
	}
	
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<div className="mt-2">
				<form >
					<div className="form-control">
						<input
							className='input input-bordered input-info  pr-4 w-full max-w-xs'
							type="text" 
							placeholder='Search' 
							value={text}
							onChange={handleChange}
						/>
							<button
							className='btn mt-3 w-36 btn-primary'
							type="button"
							onClick={handleSearch}
						>
							Go
						</button>
					</div>
					{users.length > 0 && (
						<div>
							<button onClick={handleClear} type='button' className="btn btn-ghost mt-3 btn-md px-5">Clear</button>
						</div>
					)}
						
				</form>
			</div>
    </div>
  )
}

export default SearchUsers;