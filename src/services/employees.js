import api from "./api";

export const getAllEmployeesByBusiness = async (id) => {
    const response = await api.get(`/employees/getAllEmployeesByBusiness/${id}`);
    return response.data;
};  

export const registerEmployees = (data) => {
    return api.post("/employees/registerEmployees", data);
};