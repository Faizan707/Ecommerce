import React, { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'
import { useDispatch } from 'react-redux'
import { addCategory } from '../redux/features/categorySlice'
function useCategories() {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const dispatch = useDispatch()

    const createCategory = async(formdata) =>{
        setLoading(true)
        setError(null)
        try{

            const axiosInstance = await getAxiosInstance()
            const response = await axiosInstance.post("/api/create-category",formdata)
            setLoading(false)
            dispatch(addCategory(response.data))

        }catch(e){
          setError(e.response?.data?.message || "An error occured")   
        }
    }
    return {createCategory,setLoading,setError,loading,error}
}

export default useCategories