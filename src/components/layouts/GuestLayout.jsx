import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function GuestLayout(){
    const {currentUser} = useAuth();
    if(currentUser){
       return <Navigate to='/dashboard'/>
    }
    return(
        <div>
            <Outlet />
        </div>
    )
}