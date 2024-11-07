import React, { useState } from 'react';
import useUpdateOrderStatuses from '../hooks/useUpdateOrderStatuses';
import { IoMdClose } from "react-icons/io";

function UpdateOrder({ orderId, onClose }) {
    const { loading, error, updateOrderStatus } = useUpdateOrderStatuses(orderId);
    const [formData, setFormData] = useState({
        paymentStatus: "",
        orderStatus: ""
    });
    console.log(orderId)

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.paymentStatus || !formData.orderStatus) {
            alert('Please fill in both fields.'); 
            return;
        }
        await updateOrderStatus(formData);
        setFormData({ paymentStatus: "", orderStatus: "" });
        onClose(); 
    };

    return (
        <div className="flex justify-center items-center flex-col mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm absolute top-[90px]">
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold text-center mb-4">Update Order Status</h2>
                    <p className='text-[30px] hover:cursor-pointer' onClick={onClose}><IoMdClose /></p>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        name='paymentStatus'
                        value={formData.paymentStatus}
                        placeholder='Enter payment status'
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFormData}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name='orderStatus'
                        value={formData.orderStatus}
                        placeholder='Enter order status'
                        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFormData}
                    />
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Order'}
                </button>
            </form>
        </div>
    );
}

export default UpdateOrder;
