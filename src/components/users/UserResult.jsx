import {useContext } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

function UserResult() {
    const {users, loading} = useContext(GithubContext);
    //? We are using useContext hook instead of taking attributes from props
    //? createContext in GithubContext.js and useContext where we want to use attributes
    if(!loading) {         
        return (
            (users.length !== 0) && (
                <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user)=> {
                    return <UserItem user={user} key={user.id}/>
                })}
                </div>)
        )
    } else {
        return <div className=' hero text-primary-center'> 
            <CircleLoader color="#36d7b7" />
        </div>
    }
}

export default UserResult;