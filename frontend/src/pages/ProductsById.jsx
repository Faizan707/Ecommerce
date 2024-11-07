import React, { useState } from 'react';
import useProductById from '../hooks/useProductById';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { addItems } from '../redux/features/cartSlice';
import Navbar from '../components/Navbar';

function ProductsById() {
    const { id } = useParams();
    const { data: product, loading, error } = useProductById(id); 
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(prev => prev + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1); 
    };

    const handleAddToCart = () => {
        dispatch(addItems({
            id: product._id,
            title: product.title,
            quantity 
        }));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error}</p>;
    if (!product) return <p>No product found</p>;

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden w-[500px]">
                    <img
                        src={`data:image/jpeg;base64,${product.image}`}
                        alt={product.title}
                        className="w-full h-[300px] object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                        <p className="text-gray-600 mt-2 text-lg">${product.price}</p>
                        <p className="text-gray-400 text-sm mt-4">Category: {product.category.name}</p>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-lg font-medium text-gray-700">Quantity</p>
                    </div>
                    <div className="flex justify-center items-center mt-2 mb-4">
                        <button className="p-2 text-gray-700 hover:bg-gray-200" onClick={decreaseQuantity}>
                            -
                        </button>
                        <span className="w-16 text-center border border-gray-300 p-2 text-gray-700">
                            {quantity}
                        </span>
                        <button className="p-2 text-gray-700 hover:bg-gray-200" onClick={increaseQuantity}>
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
            </div>
        </>
    );
}

export default ProductsById;
