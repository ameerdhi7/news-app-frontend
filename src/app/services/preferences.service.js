import axios from "axios";
import API_BASE_URL from "../config";
import authHeader from "./auth-header";


const headers = {
    ...authHeader()
};
const getPreferencesOptions = () => {
    return axios.get(API_BASE_URL + "/v1/news/preferences/options", {headers});
};
const savePreferencesOptions = (payload) => {
    return axios.post(API_BASE_URL + "/v1/news/preferences/", payload, {headers});
};


const PreferencesService = {
    getPreferencesOptions,
    savePreferencesOptions
}

export default PreferencesService;
