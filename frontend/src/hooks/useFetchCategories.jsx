import React, { useState, useEffect, useCallback } from 'react';
import { getAxiosInstance } from '../utils/axios';
import { useDispatch } from "react-redux";
import { addCategory } from '../redux/features/categorySlice';

function useFetchCategories() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const getAllCategories = useCallback(async () => {
        setLoading(true);
        try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.get("/api/categories");
            dispatch(addCategory(response.data));  // Dispatch to Redux store
        } catch (error) {
            setError(error.message || 'Error occurred while fetching categories');
        } finally {
            setLoading(false);
        }
    }, [dispatch]);  // Adding dispatch as a dependency

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);  

    return { error, loading };
}

export default useFetchCategories;