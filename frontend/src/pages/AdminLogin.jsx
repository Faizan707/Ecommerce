import React, { useState } from 'react';
import useAdminLogin from '../hooks/useAdminLogin';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import { jwtDecode } from "jwt-decode";
import { PAGES } from '../routes/routes';

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { login, loading, error, success, setError } = useAdminLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData); 

    const token = await getAuthToken();
    if (token) {
      const decodedToken = jwtDecode(token); 

      if (decodedToken.role === "admin") {
        navigate(PAGES.AdminDashboard, { state: { decodedToken } });
    } else {
        setError("Unauthorized: Admin access only");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      className="w-auto sm:w-[400px] h-auto bg-white p-8 shadow-md rounded-lg flex flex-col justify-center m-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
  
      <label htmlFor="email" className="mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        value={formData.email}
        onChange={handleChange}
      />
  
      <label htmlFor="password" className="mb-2 text-sm font-medium">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        value={formData.password}
        onChange={handleChange}
      />
  
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
  
      {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </form>
  </div>
  
  );
}

export default AdminLogin;
