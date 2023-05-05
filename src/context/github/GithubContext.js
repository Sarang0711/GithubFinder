import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_API_TOKEN;

// ? children prop is used to wrap child component that need to access the context value
export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    function setLoading() {
        dispatch({type: 'SET_LOADING'})
    }
    function clearUsers() {
        dispatch({type: 'CLEAR_USERS'})
    }

    const searchUsers = async (text) => {
        setLoading();
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
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`https://api.github.com/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
        });
        // console.log(response);
        
        if(response.status === 404) {
            window.location = '/notfound'
            console.log("not found");
        }
        else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data,
            });
        }
    }

    // Get user repo
    const getUserRepos = async (login) => {
        setLoading();
         
        const params = new URLSearchParams({
            sort: 'created_at',
            per_page: 10,
        })
        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_API_TOKEN}`,
            },
        });
        const data = await response.json();
        // console.log(data);
        dispatch({
            type: 'GET_USER_REPOS',
            payload: data,
        })
    }
    

    return <GithubContext.Provider value={{
            users: state.users, 
            loading: state.loading, 
            user: state.user,
            repos: state.repos,
            getUser,
            getUserRepos,
            clearUsers,
            searchUsers
        }}>
        {children}
    </GithubContext.Provider>
    //? provider component wraps a section and provide the new value to context
}
export default GithubContext;
