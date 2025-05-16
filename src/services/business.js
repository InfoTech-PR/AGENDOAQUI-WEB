import api from "./api";

export const registerBusiness = (data) => {
    return api.post("/business/registerBusiness", data);
};

export const loginBusiness = (email, password, token) => {
    return api.post("/business/loginBusiness", { email, password, token });
};