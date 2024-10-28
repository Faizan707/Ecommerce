import { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useProducts() {
    const [loading,setLoading] =useState(false)
    const [error,setError] = useState(null)
    const [success ,setSuccess] =useState("")

    const createProducts = async (FormData) =>{
        setLoading(true)
        setError(null)
        try{
            const axiosInstance = await getAxiosInstance(true, {"Content-Type": "multipart/form-data"})
            const response = await axiosInstance.post("/api/products",FormData)

        }catch(e){
            setLoading(false)
            setError(e.response?.data?.message || "An error occurred");
        }finally{
          setLoading(false)
        }
    }
  return {createProducts,error,loading,success}
}

export default useProducts
