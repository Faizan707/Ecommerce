import { getAuthToken } from "./auth.js";
import axios from "axios";
const BaseUrl = 'http://localhost:8000';
export const getAxiosInstance = async (
  isAuth = false,
  customHeaders = {
    'Content-Type': 'application/json',
  }
) => {
  let headers = { ...customHeaders };

  if (isAuth) {
    const token = await getAuthToken();
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    baseURL: BaseUrl,
    headers,
  });

  return instance;
};