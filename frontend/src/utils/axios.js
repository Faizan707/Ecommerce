import { getAuthToken } from "./auth.js";
import axios from "axios";
const BaseUrl = 'https://ecommerce-backend-cg9v.onrender.com';
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