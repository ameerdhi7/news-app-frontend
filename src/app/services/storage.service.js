//defining abstract over local storage persisting
const set = (key, data) => localStorage.setItem(key, data);
const get = (key) => localStorage.getItem(key);
const remove = (key) => localStorage.removeItem(key);

const StorageService = {
    set,
    get,
    remove
}
export default StorageService;

