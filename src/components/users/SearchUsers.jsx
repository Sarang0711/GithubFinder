import React from 'react';
import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GithubActions';

function SearchUsers() {
	const [text, setText] = useState('');

	const {users, dispatch} = useContext(GithubContext);
	const {setAlert} = useContext(AlertContext);
	
	function handleChange(e) {
		setText(e.target.value);
	}

	const handleSearch = async (e) => {
		e.preventDefault();

		if(text === ''){
			setAlert("Please enter a valid username", 'error');
		}
		else{
			// @todo search user
			dispatch({type: 'SET_LOADING'})
			const users = await searchUsers(text);
			dispatch({type:'GET_USERS', payload: users})
			setText('');
		}
	
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
							<button onClick={()=> dispatch({type: 'CLEAR_USERS'}) } type='button' className="btn btn-ghost mt-3 btn-md px-5">Clear</button>
						</div>
					)}
						
				</form>
			</div>
    </div>
  )
}

export default SearchUsers;