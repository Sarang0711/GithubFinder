import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const GithubProvider = ({children}) => {
    const [users, setUsers] =  useState([]);
    const [loading, setLoading] = useState(false);

    const searchUsers = async (text) => {
        setLoading(true);
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
        });
        const {items} = await response.json();
        setUsers(items);
        setLoading(false);
    }
    

    return <GithubContext.Provider value={{users, setUsers, loading, searchUsers}}>
        {children}
    </GithubContext.Provider>
}
export default GithubContext;
