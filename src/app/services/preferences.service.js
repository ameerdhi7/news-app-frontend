import axios from "axios";
import API_BASE_URL from "../config";

const getPreferencesOptions = () => {
    return axios.get(API_BASE_URL + "/v1/news/preferences/options");
};
const savePreferencesOptions = (payload) => {
    return axios.post(API_BASE_URL + "/v1/news/preferences/",payload);
};


const PreferencesService = {
    getPreferencesOptions,
    savePreferencesOptions
}

export default PreferencesService;
