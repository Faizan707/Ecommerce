import React from 'react'
import useFetchProductsByCategories from '../hooks/useFetchProductsByCategories'
import { useParams } from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner"
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addItems } from '../redux/features/cartSlice'
function ProductsByCategories() {
    const { id, name } = useParams()
    const { error, loading, data } = useFetchProductsByCategories(id)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(prev => prev + 1);

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1); 
    };

    const handleAddToCart = (productId,productTitle) => {
        dispatch(addItems({
            id: productId,
            title:productTitle,
            quantity 
        }));
    };

    if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>
    if (loading) return <LoadingSpinner />

    return (
       <>
       <Navbar />
       <div className="max-w-6xl mx-auto p-8 my-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Products in {name}</h1>
            {data?.products && data.products.length > 0 ? (
                <div className="space-y-8">
                    {data.products.map((product) => (
                        <div key={product._id} className="space-y-6">
                            <div className="w-full overflow-hidden rounded-lg">
                                <img
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    alt={product.title}
                                    className="w-full h-auto object-cover "
                                />
                            </div>
                            <div className="text-gray-800 space-y-2 px-4">
                                <h2 className="text-2xl font-semibold">{product.title}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-lg font-medium">Price: ${product.price}</p>
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
                            onClick={()=>handleAddToCart(product._id,product.title)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Add Order
                        </button>
                    </div>
                        </div>
                        
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-6">No products found for this category.</p>
            )}
        </div>
       </>
    )
}

export default ProductsByCategories
