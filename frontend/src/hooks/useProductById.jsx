import React, { useEffect, useState } from 'react';
import { getAxiosInstance } from '../utils/axios';

function useProductById(id) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null); // Initialize as null since we expect a single product

    const getProductById = async () => {
        setLoading(true);
        setError(null);
        try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.get(`/api/products/${id}`);
            setData(response.data);

        } catch (e) {
            setError(e.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getProductById();
        }
    }, [id]);

    return { data, loading, error };
}

export default useProductById;
