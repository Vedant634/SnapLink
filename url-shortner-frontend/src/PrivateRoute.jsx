import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi"

export default function PrivateRoute({ children , publicPage }) {
      const {token:jwtToken ,setToken} = useStoreContext()
      const token = jwtToken?.accessToken;

    if(publicPage){
        return token? <Navigate to = "/dashboard" /> : children
    }

     return !token ? <Navigate to="/login" /> : children;
}