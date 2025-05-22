import api from "./api";

export const getAllSchedulingsByBusinessId = async (id) => {
    const response = await api.get(`/schedulings/getAllSchedulingsByBusinessId/${id}`);
    return response.data;
};