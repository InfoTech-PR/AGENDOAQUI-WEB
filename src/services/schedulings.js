import api from "./api";

export const getAllSchedulingsByBusinessId = async (id) => {
    const response = await api.get(`/schedulings/getAllSchedulingsByBusinessId/${id}`);
    return response.data;
};

export const getSchedulingById = async (id) => {
    const response = await api.get(`/schedulings/getSchedulingById/${id}`);
    return response.data;
};

export const registerScheduling = (data) => {
    return api.post("/schedulings/registerScheduling", data);
};

export const updateScheduling = (data) => {
    return api.patch("/schedulings/updateScheduling", data)
}

//cancelado
export const createSchedulingCancel = (data) => {
    return api.post("/schedulingsCancel/createSchedulingCancel", data);
};