import { MdAlternateEmail } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";

const menu = [
    {
        label: "Dashboards",
        path: "/dashboards",
        icon: TbLayoutDashboardFilled,
        subItems: [
            { label: "Resultados do Monitoramento", path: "/dashboards/control", icon: GiPlantsAndAnimals },
        ]
    },
];

export const getMenuByRole = (role) => {
    return menu.filter(item => {
        if (item.label === "Pedidos" && role !== "manager") return false;
        return true;
    });
};

export default menu;
