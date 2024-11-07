import React, { useState } from 'react';
import useAllProducts from '../hooks/useAllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../routes/routes';
import { addItems } from '../redux/features/cartSlice';

function AllProducts() {
  const { error, loading } = useAllProducts();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  const products = useSelector((state) => state.Products.ProductsData);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + change;
      return {
        ...prevQuantities,
        [id]: newQuantity > 0 ? newQuantity : 1, 
      };
    });
  };
  

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-[40px] text-center mt-5">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => {
            const handleNavigate = (id) => {
              navigate(PAGES.ProductByID.replace(":id", id));
            };

            const handleAddToCart = (event) => {
              event.stopPropagation(); 
              dispatch(addItems({
                id: product._id,
                title: product.title,
                quantity: quantities[product._id] || 1,
              }));
            };

            return (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:cursor-pointer"
                onClick={() => handleNavigate(product._id)}
              >
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.title}
                  className="w-[500px] h-[300px] object-cover"
                />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
                  <p className="text-gray-600 mt-2">${product.price}</p>
                  <p className="text-gray-400 text-sm mt-4">Category: {product.category?.name}</p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-lg font-medium text-gray-700">Quantity</p>
                </div>
                <div className="flex justify-center items-center mt-2 mb-4">
                  <button
                    className="p-2 text-gray-700 hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(product._id, -1);
                    }}
                  >
                    -
                  </button>
                  <span className="w-16 text-center border border-gray-300 p-2 text-gray-700">
                    {quantities[product._id] || 1}
                  </span>
                  <button
                    className="p-2 text-gray-700 hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(product._id, 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-center mb-6 mt-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Add Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}

export default AllProducts;
