import axios from "axios";

export const api = axios.create({
    baseURL:"https://tranquil-charm-production-08e8.up.railway.app"
});

