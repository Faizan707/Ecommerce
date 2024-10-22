import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

function AdminDashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="w-[300px] h-[87vh] bg-white shadow-lg mt-2 flex flex-col items-center">
        <button className="bg-[#e7f0ff] text-[#2377fc] shadow-lg rounded-[10px] mt-7 p-4 mb-4 w-[80%] text-center">
          Dashboard
        </button>

        <button className="bg-[#e7f0ff] text-[#2377fc] shadow-lg rounded-[10px] p-4 w-[80%] text-center">
          Add Category
        </button>
      </div>
    </>
  );
}

export default AdminDashboard;
