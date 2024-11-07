import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AddCategories from '../components/AddCategories.jsx';
import AddProduct from '../components/AddProduct.jsx';
import { FaPlusCircle, FaThList, FaInfoCircle } from 'react-icons/fa';
import OrderDetails from '../components/OrderDetails.jsx';

function AdminDashboard() {
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleProducts, setToggleProducts] = useState(false);
  const [togleOrders,setToggleOrders] =useState(false)
  const handleCategoryToggle = () => {
    setToggleCategory((prevState) => !prevState);
    setToggleProducts(false); 
  };

  const handleProductToggle = () => {
    setToggleProducts((prev) => !prev);
    setToggleCategory(false); 
  };
  const handleOrdersToggle = () => {
    setToggleOrders((prev) => !prev);
    setToggleCategory(false); 
    setToggleProducts(false)
  };

  return (
    <>
      <AdminNavbar />
      <div className="lg:flex sm:block w-full min-h-screen ">
        {/* Sidebar with Vibrant Background */}
        <div className="lg:w-[300px] lg:h-[100vh] bg-gradient-to-br from-blue-600 to-indigo-800 lg:shadow-lg flex flex-col items-center sm:w-full py-8 rounded-r-xl shadow-md border-r border-gray-300 text-white">
          <h2 className="text-2xl font-semibold mb-10">Admin Panel</h2>

          <button
            className={`flex items-center justify-center bg-white bg-opacity-20 text-white hover:bg-blue-500 hover:text-white transition-shadow duration-300 rounded-xl p-4 mb-4 w-[80%] ${
              toggleProducts && 'bg-blue-500 bg-opacity-40'
            }`}
            onClick={handleProductToggle}
          >
            <FaPlusCircle className="mr-2" />
            {toggleProducts ? 'Close Products' : 'Add Products'}
          </button>

          <button
            className={`flex items-center justify-center bg-white bg-opacity-20 text-white hover:bg-blue-500 hover:text-white transition-shadow duration-300 rounded-xl p-4 mb-4 w-[80%] ${
              toggleCategory && 'bg-blue-500 bg-opacity-40'
            }`}
            onClick={handleCategoryToggle}
          >
            <FaThList className="mr-2" />
            {toggleCategory ? 'Close Category' : 'Add Category'}
          </button>

          <button
            className="flex items-center justify-center bg-white bg-opacity-20 text-white hover:bg-blue-500 hover:text-white transition-shadow duration-300 rounded-xl p-4 mb-4 w-[80%]"
            onClick={handleOrdersToggle}
          >
            <FaInfoCircle className="mr-2" />
            {togleOrders ? "Close Order Details" : "Order Details"}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex- p-6 mx-auto w-full lg:max-w-3xl">
          {/* Category Form */}
          {toggleCategory && (
            <div className="w-full  rounded-lg p-6 animate-fadeIn">
              <AddCategories />
            </div>
          )}

          {/* Product Form */}
          {toggleProducts && (
            <div className="w-full  rounded-lg p-6 animate-fadeIn">
              <AddProduct />
            </div>

            
          )}

{togleOrders && (
            <div className="w-auto  rounded-lg p-6 animate-fadeIn">
              <OrderDetails/>
            </div>
          )}
        </div>
        
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default AdminDashboard;
