import { useEffect, useContext } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResult() {
    const {users, loading, searchUsers} = useContext(GithubContext);
    // useEffect(()=> {
    //     console.log(users);
    // }, []);
    
    if(!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user)=> {
                return <UserItem user={user} key={user.id}/>
            })}
            </div>
        )
    } else {
        return <div className=' hero text-primary-center'> 
            <CircleLoader color="#36d7b7" />
        </div>
    }
}

export default UserResult;