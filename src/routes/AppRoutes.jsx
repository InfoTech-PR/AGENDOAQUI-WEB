import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/errors/NotFound";
import NotAuthorized from "../pages/errors/NotAuthorized";
import InitialSystem from "../pages/initials/InitialSystem";
import PrivateRoute from "./PrivateRoute";
import InitialBusiness from "../pages/initials/InitialBusiness";
import RegisterBusiness from "../pages/registers/RegisterBusiness";
import RegisterBusinessSocials from "../pages/registers/RegisterBusinessSocials";
import LoginBusiness from "../pages/login/LoginBusiness";
import ClientList from "../pages/client/ClientList";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login público */}
                <Route path="/login-negocios" element={<LoginBusiness />} />

                {/* Rotas Iniciais (home) */}
                <Route path="/" element={<InitialSystem />} />
                <Route path="/business" element={<InitialBusiness />} />
                
                {/* Registros */}
                <Route path="/registro-negocios" element={<RegisterBusiness />} />
                <Route path="/registro-negocios-social" element={<RegisterBusinessSocials />} />

                {/* Rota protegida */}
                <Route path="/clientes" element={<PrivateRoute requiredRole="admin" ><ClientList /></PrivateRoute>} />
                
                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* <Route path="/termos-servico" element={<TermosServico />} /> */}
                {/* <Route path="/privacy-politics" element={<PolicyPrivatics />} /> */}
            </Routes>
        </Router>
    );
}
