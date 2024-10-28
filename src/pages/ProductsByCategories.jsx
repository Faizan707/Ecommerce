import React from 'react'
import useFetchProductsByCategories from '../hooks/useFetchProductsByCategories'
import { useParams } from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner"
import Navbar from '../components/Navbar'

function ProductsByCategories() {
    const { id, name } = useParams()
    const { error, loading, data } = useFetchProductsByCategories(id)

    if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>
    if (loading) return <LoadingSpinner />

    return (
       <>
       <Navbar/>
<div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> {name}</h1>
            {data?.products && data.products.length > 0 ? (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.products.map((product) => (
                        <li key={product._id} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                            <div className="w-full h-64 overflow-hidden rounded-lg">
                                <img
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-medium text-gray-700">Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 mt-6">No products found for this category.</p>
            )}
        </div>
        </>

    )
}

export default ProductsByCategories
