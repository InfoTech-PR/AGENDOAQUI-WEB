import { FaUserFriends, FaCalendarAlt, FaUserCircle, FaQuestionCircle } from "react-icons/fa";

const menu = [
  {
    label: "Clientes",
    path: "/admin/clientes",
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
];

export const getMenuByRole = (role) => {
  return menu.filter(item => {
    if (item.role && item.role !== role) return false;
    return true;
  });
};

export default menu;
