import { FaUserFriends, FaCalendarAlt, FaUserCircle, FaQuestionCircle, FaHistory } from "react-icons/fa";

const menu = [
  {
    label: "Clientes",
    icon: FaUserFriends,
    role: "admin",
    subItems: [
      {
        label: "Listar Clientes",
        path: "/clientes",
        role: "admin",
      },
      {
        label: "Cadastrar Cliente",
        path: "/cadastrar-clientes",
        role: "admin",
      },
    ]
  },  
  {
    label: "Agendamentos",
    icon: FaCalendarAlt,
    role: "admin",
    subItems: [
      {
        label: "Listar Agendamentos",
        path: "/agendamentos",
        role: "admin",
      },
      {
        label: "Cadastrar Agendamentos",
        path: "/cadastrar-agendamentos",
        role: "admin",
      },
    ]
  }, 
  {
    label: "Minha Página",
    path: "/minha-pagina",
    icon: FaUserCircle,
    role: "admin",
  },
  {
    label: "Ajuda",
    path: "/ajuda",
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
