import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { removeAuthToken } from '../utils/auth';
import { PAGES } from '../routes/routes';

function AdminNavbar() {
    const location = useLocation()
    const { decodedToken } = location.state || {};
    const navigate =useNavigate()
    const handleAdminLogout = () =>{
      removeAuthToken(decodedToken.role==="admin")
      navigate(PAGES.Home)

    }
  return (
    <>
      <nav className="bg-white py-4 shadow-md px-6 md:px-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-800">Techify</h1>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="text-right">
              <p className="text-lg font-medium text-gray-900">
                {decodedToken?.name || 'User Name'}
              </p>
              <p className="text-sm text-gray-500">
                {decodedToken?.role || 'Role'}
              </p>
            </div>
            <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 md:p-3 rounded-full transition duration-300" onClick={handleAdminLogout}>
              <IoLogOutOutline size={24} />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminNavbar;
