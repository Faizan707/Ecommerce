import React, { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'
function useCategories() {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    const createCategory = async(formdata) =>{
        setLoading(true)
        setError(null)
        try{

            const axiosInstance = await getAxiosInstance(true)
            const response = await axiosInstance.post("/api/create-category",formdata)
            setLoading(false)

        }catch(e){
          setError(e.response?.data?.message || "An error occured")   
        }finally{
            setLoading(false)
        }
        }
    return {createCategory,setLoading,setError,loading,error}
}

export default useCategories