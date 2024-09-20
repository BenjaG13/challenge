import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const AppContext = createContext()

const initialState = {
    token: localStorage.getItem('token')
}


export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
 
    const setToken = (token) => {
        localStorage.setItem('token', token);
        dispatch( {type:"TOKEN", payload: token} )  
    }
   
    return (        
        <AppContext.Provider value={{state, setToken}}>
            {children}
        </AppContext.Provider>
    )
}
