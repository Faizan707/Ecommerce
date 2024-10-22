import { useState } from 'react';
import { getAxiosInstance } from '../utils/axios';
import { setAuthToken } from '../utils/auth';

function useAdminLogin() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);
    setError(false); 
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post("/api/admin-login", formData);

      const data = response.data;

      setAuthToken(data.token);


      setSuccess("Login successful!");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, success,setSuccess, setError, setLoading, loading };
}

export default useAdminLogin;
