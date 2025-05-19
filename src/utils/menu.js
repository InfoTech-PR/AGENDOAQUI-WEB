import { FaUserFriends, FaCalendarAlt, FaUserCircle, FaQuestionCircle, FaHistory } from "react-icons/fa";

const menu = [
  {
    label: "Clientes",
    path: "/clientes",
    icon: FaUserFriends, 
    role: "admin",
  },
  {
    label: "Agendamentos",
    path: "/admin/agendamentos",
    icon: FaCalendarAlt,
    role: "admin",
  },
  {
    label: "Minha Página",
    path: "/admin/minha-pagina",
    icon: FaUserCircle,
    role: "admin",
  },
  {
    label: "Ajuda",
    path: "/admin/ajuda",
    icon: FaQuestionCircle, 
    role: "admin",
	},
	{
    label: "Agendamentos",
    path: "/cliente/meus-agendamentos",
    icon: FaCalendarAlt,
    role: "client",
  },
  {
    label: "Historico",
    path: "/cliente/historico",
    icon: FaHistory, 
    role: "client",
  },
];

export const getMenuByRole = (role) => {
  return menu.filter(item => {
    if (item.role && item.role !== role) return false;
    return true;
  });
};

export default menu;
