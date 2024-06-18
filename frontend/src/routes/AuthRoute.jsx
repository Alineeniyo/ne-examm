import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function AuthRoute() {
    const {user } = useContext(UserContext)
     return user.email ?<Outlet/> : <Navigate to ='/'/>
}
