import { Children, createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const AuthContext = ({children}) =>{
    const [user,setUser] = useState('manish');

    const login = (name)=>{
        setUser(name)
    }
    const logout = () => {
        setUser(null);
    }
    const value = {user,login,logout};
    throw Error("This is the description of the error");
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(UserContext);
}