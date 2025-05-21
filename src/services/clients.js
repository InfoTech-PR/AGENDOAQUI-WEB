import api from "./api";

export const registerClient = (data) => {
    return api.post("/clients/registerClient", data);
};

export const getAllClients = async () => {
    const response = await api.get("/clients/getAllClients");
    return response.data;
};

export const getClientById = async (id) => {
    const response = await api.get(`/clients/getClientById/${id}`);
    return response.data;
};