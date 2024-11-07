import React, { useState } from 'react';
import useGetOrders from '../hooks/useGetOrders';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateOrder from './UpdateOrder';

function OrderDetails() {
    const { error } = useGetOrders();
    const orders = useSelector((state) => state.order.orderData);
    const [toggleStatusForm, setToggleStatusForm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleToggleStatus = (id) => {
        setSelectedOrderId(id);
        setToggleStatusForm((prev) => !prev);
    };
    const handleClose = () => {
        setToggleStatusForm(false);
        setSelectedOrderId(null);
    };


    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-center mb-5">Order Details</h1>

            {/* Table layout for larger screens */}
            <div className="hidden md:block overflow-x-visible">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Customer Name</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Product Details</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Location</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Date</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Amount</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Status</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Payment Status</th>
                            <th className="px-4 py-3 text-left font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">No orders available</td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={order._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-4 py-3 border-b border-gray-200">{order.user?.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">
                                        {order.products.map((product) => (
                                            <div key={product.product._id} className="flex flex-col items-center mb-2">
                                                <img src={`data:image/jpeg;base64,${product.product.image}`} alt={product.product.title} className="w-16 h-16 mr-2 rounded" />
                                                <div>
                                                    <p className="font-semibold">{product.product.title}</p>
                                                    <p className="text-gray-500">Qty: {product.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-200">
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-200">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 border-b border-gray-200">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-4 py-3 border-b border-gray-200">
                                        <span className={`px-3 py-1 rounded-full text-white ${order.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-200">
                                        <span className={`px-3 py-1 rounded-full text-white ${order.paymentStatus === 'Complete' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 mt-[50px] flex space-x-2">
                                        <button
                                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                            onClick={() => handleToggleStatus(order._id)}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile screens */}
            <div className="md:hidden space-y-4">
                {orders.length === 0 ? (
                    <div className="text-center text-gray-500">No orders available</div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                            <h2 className="font-semibold text-lg mb-2">{order.user?.name}</h2>
                            <div className="flex flex-col space-y-2 mb-2">
                                {order.products.map((product) => (
                                    <div key={product.product._id} className="flex items-center">
                                        <img src={`data:image/jpeg;base64,${product.product.image}`} alt={product.product.title} className="w-16 h-16 mr-2 rounded" />
                                        <div>
                                            <p className="font-semibold">{product.product.title}</p>
                                            <p className="text-gray-500">Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600"><span className="font-semibold">Location:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-600"><span className="font-semibold">Amount:</span> ${order.totalAmount.toFixed(2)}</p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Status:</span>
                                <span className={`ml-2 px-3 py-1 rounded-full text-white ${order.orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                                    {order.orderStatus}
                                </span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold mt-3">Payment Status:</span>
                                <span className={`ml-2 px-3 py-1 rounded-full text-white ${order.paymentStatus === 'Completed' ? 'bg-green-500' : 'bg-yellow-400'}`}>
                                    {order.paymentStatus}
                                </span>
                            </p>
                            <div className="flex space-x-2 mt-4">
                                <button
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                    onClick={() => handleToggleStatus(order._id)}
                                >
                                    <MdEdit />
                                </button>
                                <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            {toggleStatusForm && selectedOrderId && (
                <UpdateOrder orderId={selectedOrderId} onClose={handleClose} />
            )}
        </div>
    );
}

export default OrderDetails;
