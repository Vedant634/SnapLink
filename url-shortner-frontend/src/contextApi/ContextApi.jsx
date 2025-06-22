import { createContext, useContext, useEffect, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({children}) => {
        const [token,setToken] = useState(()=>{
            try {
            const saved = localStorage.getItem("JWT_TOKEN");
           
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
        });

        useEffect(() => {
        if (token) {
            localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
        } else {
            localStorage.removeItem("JWT_TOKEN");
        }
    }, [token]);

     return (
        <ContextApi.Provider value={{ token, setToken }}>
            {children}
        </ContextApi.Provider>
    );
}

export const useStoreContext = () => useContext(ContextApi);