import  { useState } from 'react'
import { getAxiosInstance } from '../utils/axios';

function useSignUp() {

    const [error,setError] = useState(false)
    const [loading,setLoading]= useState(false)
    const [success,setSuccess] =useState("")

    const signUp = async (formData) =>{
        setLoading(true);
        try{
            const axiosInstance = await getAxiosInstance()
            const response = axiosInstance.post("/api/create-user",formData)
            setSuccess("User Created Successfully")
        }catch(error){
            setError(error.response?.data?.message || "An error occured")
            setSuccess("")
        }
    }

  return {signUp,error,setError,loading,setLoading,setSuccess,success}
}

export default useSignUp