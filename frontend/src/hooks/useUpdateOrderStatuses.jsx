import React, { useState } from 'react';
import { getAxiosInstance } from '../utils/axios';

function useUpdateOrderStatuses(id) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateOrderStatus = async (formData) => {
        setError(null);
        setLoading(true);

        try {
            const axiosInstance = await getAxiosInstance(true);
            const response = await axiosInstance.put(`/api/order/${id}`, formData);
            return response.data; // Return response for further handling if needed
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, updateOrderStatus }; // Return loading state
}

export default useUpdateOrderStatuses;
