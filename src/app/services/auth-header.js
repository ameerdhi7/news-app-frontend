import StorageService from "./storage.service";

export default function authHeader() {
    const token = StorageService.get("token");
    if (token) {
        return {"bearer": token};
    } else {
        return {};
    }
}