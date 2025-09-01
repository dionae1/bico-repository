import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoutes;
