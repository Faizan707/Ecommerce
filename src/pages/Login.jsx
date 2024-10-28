import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import useUserLogin from '../hooks/useUserLogin'
import { useLocation, useNavigate } from 'react-router-dom'

function Login() {

      const [formData,setFormData] = useState({
        email:"",
        password:""
      })

      const {error,loading,login} = useUserLogin()
      const navigate = useNavigate()
      const location = useLocation()
      const fromPage = location.state?.from?.pathname || "/";

      const submitFormData = async(e) =>{
        e.preventDefault()
        const success = await login(formData);

        if (success) {
            navigate(fromPage, { replace: true }); 
        }

      }
      


      const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }

      

     
  return (
    <>
        <Navbar/>
        <form 
    onSubmit={submitFormData} 
    className="flex flex-col gap-6 justify-center items-center w-full max-w-[400px] mx-auto mt-10 bg-white shadow-md rounded-lg px-6 py-8 sm:w-[400px]"
>
    <h1 className="text-3xl font-semibold text-gray-800">Login</h1>

    <input 
        type="email" 
        value={formData.email}
        onChange={handleChange}
        name='email'
        placeholder="Enter your email"
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    /> 

    <input 
        type="password" 
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name='password'
   /> 

    <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg "
    >
            {loading? "Loggin...." :"Login"}

    </button>
      
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
</form>  

    </>
  )
}

export default Login