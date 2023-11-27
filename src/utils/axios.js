import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common.Authorization = `Bearer ${user?.data?.access_token}`;
  }
  return config;
});

export default api;
