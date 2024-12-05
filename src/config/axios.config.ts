import axios from "axios";

const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}`,
  headers: { "Content-Type": "application/json" },
});

export default axiosApi;
