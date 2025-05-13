import api from "./api";

export const registerBusiness = (data) => {
    return api.post("/business/registerBusiness", data);
};