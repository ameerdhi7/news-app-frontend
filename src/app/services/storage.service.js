//defining abstract over local storage persisting
const set = (key, data) => localStorage.setItem(key, data);
const get = (key) => localStorage.getItem(key);

const StorageService = {
    set,
    get
}
export default StorageService;

