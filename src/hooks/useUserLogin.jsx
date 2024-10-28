import React, { useState } from 'react';
import { getAxiosInstance } from '../utils/axios';
import { setAuthToken } from '../utils/auth';
import { jwtDecode } from "jwt-decode";
import useUserById from './useUserById';
import { useDispatch } from 'react-redux';
import { addUsers } from '../redux/features/userSlice';
function useUserLogin() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
  
    const { getUser } = useUserById();
  
    const login = async (formData) => {
        setLoading(true);
        setError(null);
    
        try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.post("/api/login-user", formData);
            const token = response.data.token;
    
            setAuthToken(token);
    
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); 
    
            const userId = decodedToken.userId;
    
            if (!userId) {
                throw new Error("User ID not found in token");
            }
    
            const profile = await getUser(userId);
            dispatch(addUsers(profile));
    
            return true;
        } catch (e) {
            setError(e?.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };
    
    return { error, loading, login };
  }
  
  export default useUserLogin;
