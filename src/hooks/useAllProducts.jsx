import React, { useState, useEffect } from 'react';
import { getAxiosInstance } from '../utils/axios';
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/features/productsSlice';

function useAllProducts() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.get('/api/products/get-products');
      dispatch(addProducts(response.data)); 
    } catch (e) {
      setError(e.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);  

  return { error, loading };
}

export default useAllProducts;
