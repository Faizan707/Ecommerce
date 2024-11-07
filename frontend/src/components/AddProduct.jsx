import React, { useState } from 'react';
import useFetchCategories from '../hooks/useFetchCategories';
import useProducts from '../hooks/useProducts';
import { getAuthToken } from '../utils/auth';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';

function AddProduct() {
  const { error: categoryError,  } = useFetchCategories();
  const { createProducts, error: productError, loading: productLoading, success } = useProducts();
  const [formData, setFormData] = useState({
    title: '',
    price: '', 
    description: '',
    categoryId: '', 
    isBestProduct: false,
  });
  const categories = useSelector((state) => state.category.categoriesData);

  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
      setImage(e.target.files[0]);    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); 

    const token = await getAuthToken();

    if(token){
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === 'admin') {
            const productData = new FormData();
            productData.append('title', formData.title);
            productData.append('price', parseFloat(formData.price));
            productData.append('description', formData.description);
            productData.append('categoryId', formData.categoryId);
            productData.append('isBestProduct', formData.isBestProduct);
      
            if (image) {
              productData.append('image', image); 
            }
            
            await createProducts(productData);
            
            setFormData({
              title: '',
              price: '',
              description: '',
              categoryId: '',
              isBestProduct: false,
            });
            setSuccessMessage('Product added successfully!');
          }
        };
      
    }
    
  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>

      {categoryError && <p className="text-red-500 mb-4">{categoryError}</p>}
      {productError && <p className="text-red-500 mb-4">{productError}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Is Best Product */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isBestProduct"
            checked={formData.isBestProduct}
            onChange={handleInputChange}
            className="h-5 w-5 text-blue-500 focus:ring focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-3 text-sm font-medium">Is Best Product</label>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={productLoading}
          className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg focus:ring-4 focus:ring-blue-300 ${
            productLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
          }`}
        >
          {productLoading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
