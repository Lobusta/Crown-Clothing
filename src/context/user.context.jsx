import { createContext, useState , useEffect } from "react";
import { onAuthStateChangedListener , createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";




//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setcurrentUser: () => null,
});



export const UserProvider = ({children}) => {
    const [currentUser, setcurrentUser] = useState(null);
    const value = {currentUser, setcurrentUser};
    
    
    useEffect(() => {
      const stoplistening =  onAuthStateChangedListener((user) => {
          if (user) {
           createUserDocumentFromAuth(user);
          }
          setcurrentUser(user);
      })

      return stoplistening;
    }, [])





 return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}