import api from "./api";

export const getAllSchedulingsByBusinessId = async (id) => {
    const response = await api.get(`/schedulings/getAllSchedulingsByBusinessId/${id}`);
    return response.data;
};

export const registerScheduling = (data) => {
    return api.post("/schedulings/registerScheduling", data);
};