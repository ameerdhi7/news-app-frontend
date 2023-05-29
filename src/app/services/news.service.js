import axios from "axios";
import API_BASE_URL from "../config";

const getHomeFeed = () => {
    const fullUrl = API_BASE_URL + "/v1/news"
    return axios.get(fullUrl);
}
const search = (searchCriteria) => {
    const fullUrl = API_BASE_URL + "/v1/search"
    return axios.get(fullUrl, searchCriteria)
}

const NewService = {
    getHomeFeed,
    search
}
export default NewService;