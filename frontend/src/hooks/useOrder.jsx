import  { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useOrder() {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const createOrder = async(orderData) =>{
        setLoading(true)
        setError(null)
        try{
            const axiosInstance =await getAxiosInstance(true)
            const response = await axiosInstance.post("/api/order/user",orderData)

        }catch(e){
            setError(e.response.message)
        }
    }

  return {error,loading,createOrder}
}

export default useOrder