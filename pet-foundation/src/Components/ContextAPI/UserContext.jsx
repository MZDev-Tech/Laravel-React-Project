import React,{createContext,useState} from 'react'


export const UserContext= createContext(null);

const UserContextProvider = (props) => {
  const[user,setUser]=useState(null);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {props.children}
      
    </UserContext.Provider>
  )
}

export default UserContextProvider

// createContext: Creates a context that can hold and pass down values to other components.
// useContext: Allows a component to access the values provided by the context created with createContext.