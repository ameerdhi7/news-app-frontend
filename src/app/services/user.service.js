import axios from "axios";
import API_BASE_URL from "../config";

const getPublicContent = () => {
    return axios.get(API_BASE_URL + "/test");
};

const UserService = {
    getPublicContent,
}

export default UserService;
