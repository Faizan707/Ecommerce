import React from 'react';
import useAllProducts from '../hooks/useAllProducts';
import { useSelector } from 'react-redux';

function AllProducts() {
  const { error, loading } = useAllProducts();

  const products = useSelector((state)=> state.Products.ProductsData)
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-[40px] text-center mt-5">Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.title}
                className="w-[500px] h-[300px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <p className="text-gray-400 text-sm mt-4">Category: {product.category.name}</p>
              </div>
              <div className="flex justify-center mb-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  Add Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}

export default AllProducts;
