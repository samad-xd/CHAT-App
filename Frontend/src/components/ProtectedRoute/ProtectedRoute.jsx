import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    return children;
}