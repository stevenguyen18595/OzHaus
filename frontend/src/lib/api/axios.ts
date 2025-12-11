// eslint-disable-next-line no-restricted-imports
import axios from "axios";

export const axiosClient = axios.create({
  // Ensure all requests are passing credentials for NTLM auth
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => ({
  ...config,
  baseURL: window.env.baseUrl,
}));