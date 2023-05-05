import { createContext, useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();
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

    return <GithubContext.Provider value={{
            ...state,
            dispatch,
        }}>
        {children}
    </GithubContext.Provider>
    //? provider component wraps a section and provide the new value to context
}
export default GithubContext;
