import api from "./api";

export const getAllServicesByBusiness = async (id) => {
    const response = await api.get(`/services/getAllServicesByBusiness/${id}`);
    return response.data;
};  