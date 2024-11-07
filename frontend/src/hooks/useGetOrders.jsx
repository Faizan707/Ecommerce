import React, { useEffect, useState } from 'react'
import { getAxiosInstance } from '../utils/axios'
import { useDispatch } from 'react-redux'
import { addOrder } from '../redux/features/orderSlice'

function useGetOrders() {
  const [error,setError] =useState(null)
  const dispatch =useDispatch()
  const getOrders = async () =>{
    setError(null)
    try{
      const axiosInstance = await getAxiosInstance(true)
      const response = await axiosInstance("/api/order/getOrders")
      dispatch(addOrder(response.data))
    }catch(e){
      setError(e.response?.data?.message || e.message || "An error occured")
    }
  }
  useEffect(()=>{
    getOrders()
  },[])
  return {error,}
  }

export default useGetOrders