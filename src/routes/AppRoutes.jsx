import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/errors/NotFound";
import NotAuthorized from "../pages/errors/NotAuthorized";
import InitialSystem from "../pages/initials/InitialSystem";
import RegisterUser from "../pages/RegisterUser";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import NewPasswordReset from "../pages/NewPasswordReset";
import PrivateRoute from "./PrivateRoute";
import InitialBusiness from "../pages/initials/InitialBusiness";
import InitialAdmin from "../pages/initials/InitialAdmin";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password/:token" element={<NewPasswordReset />} />

                <Route path="/" element={<InitialSystem />} />
                <Route path="/business" element={<InitialBusiness />} />

                <Route path="/admin" element={<PrivateRoute requiredRole="admin" ><InitialAdmin /></PrivateRoute>} />
                {/* <Route path="/admin" element={<PrivateRoute requiredRole="guest" ><InitialAdmin /> </PrivateRoute>} /> */}

                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* Rota protegida */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
