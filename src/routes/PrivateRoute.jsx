import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedUser = localStorage.getItem("dataUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser);
        }
        setLoading(false);
    }, []);
    
    const token = userData?.token;
    const role = userData?.user?.role;

    if (loading) return null;
    if (!token) return <Navigate to="/" replace />;

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
}