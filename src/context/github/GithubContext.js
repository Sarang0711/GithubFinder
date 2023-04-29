import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_API_TOKEN;

// ? children prop is used to wrap child component that need to access the context value
export const GithubProvider = ({children}) => {
    const [users, setUsers] =  useState([]);
    const [loading, setLoading] = useState(false);

    const searchUsers = async (text) => {
        setLoading(true);
        const params = new URLSearchParams({
            q: text
        })
        // ? The URLSearchParams contains key value pairs allows to parse query parameters 
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
        });
        //? items is an object of the response from server. we are interested only in items object
        const {items} = await response.json();
        setUsers(items);
        setLoading(false);
    }
    

    return <GithubContext.Provider value={{users, setUsers, loading, searchUsers}}>
        {children}
    </GithubContext.Provider>
    //? provider component wraps a section and provide the new value to context
}
export default GithubContext;
