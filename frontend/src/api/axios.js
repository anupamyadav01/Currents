import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
const baseUrl = rawBaseUrl.replace(/\/$/, "");

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export default api;
