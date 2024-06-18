import React, {createContext, useState } from 'react'

//track of user state(active) in our application

export const UserContext = createContext();

const UserProvider = ({children}) =>{
    const [user, setuser] = useState({
        email: localStorage.getItem("email")
    })

    return (
        <UserContext.Provider value={{user, setuser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;