import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import UserItem from './UserItem';

function UserResult() {

    const [users, setUsers] =  useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        fetchUsers();
    }, []);

    // console.log(process.env.REACT_APP_API_TOKEN)
    // console.log(process.env.REACT_APP_GITHUB_URL);
    const fetchUsers = async () => {
        const response = await fetch(`https://api.github.com/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
            },
        });
        const data = await response.json();
        // console.log(data);
        setUsers(data);
        setLoading(false);
    }
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

export default UserResult