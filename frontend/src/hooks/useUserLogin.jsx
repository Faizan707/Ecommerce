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
    
            if (response.status !== 200) {
                throw new Error("Login failed");
            }
    
            const token = response.data.token;
            if (!token) {
                throw new Error("Token not returned from server");
            }
    
            setAuthToken(token);
    
            let decodedToken;
            try {
                decodedToken = jwtDecode(token);
            } catch (decodeError) {
                console.error("Token decoding failed:", decodeError);
                throw new Error("Invalid token");
            }
    
            const userId = decodedToken.userId;
    
            if (!userId) {
                throw new Error("User ID not found in token");
            }
    
            const profile = await getUser(userId);
            dispatch(addUsers(profile));
    
            return true; 
        } catch (e) {
            console.error("Login error:", e);
            setError(e?.response?.data?.message || "An unexpected error occurred.");
            return false; 
        } finally {
            setLoading(false);
        }
    };
    
    
    
    return { error, loading, login };
  }
  
  export default useUserLogin;
