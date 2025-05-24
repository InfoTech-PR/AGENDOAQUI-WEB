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
import ClientDetails from "../pages/client/ClientDetails";
import SchedulingList from "../pages/scheduling/SchedulingList";
import SchedulingRegister from "../pages/scheduling/SchedulingRegister";
import SchedulingDetails from "../pages/scheduling/SchedulingDetails";
import MinhaPagina from "../pages/MinhaPagina";
import Ajuda from "../pages/Ajuda";
import ClientRegister from "../pages/client/ClientRegister";

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
                <Route path="/cadastrar-clientes" element={<PrivateRoute requiredRole="admin" ><ClientRegister /></PrivateRoute>} />
                <Route path="/detalhes-clientes/:id" element={<PrivateRoute requiredRole="admin" ><ClientDetails /></PrivateRoute>} />

                <Route path="/agendamentos" element={<PrivateRoute requiredRole="admin" ><SchedulingList /></PrivateRoute>} />
                <Route path="/cadastrar-agendamentos" element={<PrivateRoute requiredRole="admin" ><SchedulingRegister /></PrivateRoute>} />
                <Route path="/detalhes-agendamentos/:id" element={<PrivateRoute requiredRole="admin" ><SchedulingDetails /></PrivateRoute>} />
                
                <Route path="/minha-pagina" element={<PrivateRoute requiredRole="admin" ><MinhaPagina /></PrivateRoute>} />
                <Route path="/ajuda" element={<PrivateRoute requiredRole="admin" ><Ajuda /></PrivateRoute>} />
                
                {/* Rota de erro */}
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="*" element={<NotFound />} />

                {/* <Route path="/termos-servico" element={<TermosServico />} /> */}
                {/* <Route path="/privacy-politics" element={<PolicyPrivatics />} /> */}
            </Routes>
        </Router>
    );
}
