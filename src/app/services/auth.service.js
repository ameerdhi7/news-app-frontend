import axios from "axios";
import API_BASE_URL from "../config";

const API_URL = API_BASE_URL;

const register = (name, email, password) => {
    return axios.post(API_URL + "/v1/register", {
        name,
        email,
        password,
    });
};

const login = (email, password) => {
    const fullUrl = API_URL + "/v1/login";

    const payload = {
        email,
        password,
    };
    console.log(payload);
    return axios
        .post(fullUrl, payload)
        .then((response) => {
            if (response.data.email) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "/v1/logout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
