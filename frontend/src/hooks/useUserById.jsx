import React, { useState } from 'react';
import { getAxiosInstance } from '../utils/axios';

function useUserById() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUser = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const axiosInstance = await getAxiosInstance(true);
      const response = await axiosInstance.get(`/api/users/${id}`);
      return response.data;  
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to fetch user data.");
      return null; 
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getUser };
}

export default useUserById;
