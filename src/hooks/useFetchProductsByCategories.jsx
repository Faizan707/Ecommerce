import React, { useEffect, useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useFetchProductsByCategories(categoryId) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const getProductsByCategories = async (categoryId) => {
        setLoading(true)
        try {
            const axiosInstance = await getAxiosInstance()
            const response = await axiosInstance.get(`/api/products/category/${categoryId}`)
            setData(response.data)
        } catch (e) {
            setError(e.response?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categoryId) {
            getProductsByCategories(categoryId)
        }
    }, [categoryId])

    return { error, loading, data }
}

export default useFetchProductsByCategories
