import React, { useEffect, useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useGetAllUsers() {

    const [error,setError] = useState(null)
    const [data,setData] = useState([])
    const getAllUsers = async() =>{
        setError(null)
        try{
            const axiosInstance = await getAxiosInstance(true)
            const response = await axiosInstance.get("/api/users")
            setData(response.data)
        }catch(e){
            setError(e.response.message)
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])


  return {error,data}
}

export default useGetAllUsers