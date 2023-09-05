import { ReactNode, useState, createContext, useContext } from "react";

type UserContext = {
    user: string;
    setUser: (newUser: string) => void;
}
export const UserContext = createContext<UserContext | null>(null);

export const UserProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState(''); 
    
    return(
        <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
    )
    
}

export const useUser = () => useContext(UserContext);