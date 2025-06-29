import { createContext, useContext, useEffect, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      const saved = localStorage.getItem("JWT_TOKEN");
      return saved
        ? JSON.parse(saved)
        : { accessToken: null, refreshToken: null };
    } catch {
      return { accessToken: null, refreshToken: null };
    }
  });

  useEffect(() => {
  if (token?.accessToken && token?.refreshToken) {
    localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
  } 
}, [token]);


  return (
    <ContextApi.Provider value={{ token, setToken }}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => useContext(ContextApi);
