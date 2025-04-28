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

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password/:token" element={<NewPasswordReset />} />

                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* Rota protegida */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/initial-system" element={<InitialSystem />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
