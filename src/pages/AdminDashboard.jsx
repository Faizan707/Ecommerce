import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AddCategories from '../components/AddCategories.jsx';
import AddProduct from '../components/AddProduct.jsx';

function AdminDashboard() {
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleProducts, setToggleProducts] = useState(false);

  const handleCategoryToggle = () => {
    setToggleCategory((prevState) => !prevState);
    setToggleProducts(false); 
  };

  const handleProductToggle = () => {
    setToggleProducts((prev) => !prev);
    setToggleCategory(false); 
  };

  return (
    <>
      <AdminNavbar />
      <div className=" lg:flex sm:block w-full">
        {/* Sidebar */}
        <div className="lg:w-[300px] lg:h-[100vh] bg-white lg:shadow-lg mt-2 flex flex-col items-center sm:w-full shadow-none h-[100px]">
          <button
            className="bg-[#e7f0ff] text-[#2377fc] shadow-lg rounded-[10px] mt-7 p-4 mb-4 w-[80%] text-center"
            onClick={handleProductToggle}
          >
            {toggleProducts ? 'Close Add Products' : 'Add Products'}
          </button>

          <button
            className="bg-[#e7f0ff] text-[#2377fc] shadow-lg rounded-[10px] p-4 w-[80%] text-center"
            onClick={handleCategoryToggle}
          >
            {toggleCategory ? 'Close Add Category' : 'Add Category'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 mx-auto w-full">
          {/* Category Form */}
          {toggleCategory && (
            <div className="w-full">
              <AddCategories />
            </div>
          )}

          {/* Product Form */}
          {toggleProducts && (
            <div className="w-full">
              <AddProduct />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
