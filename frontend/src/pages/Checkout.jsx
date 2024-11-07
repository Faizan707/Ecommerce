import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import useOrder from '../hooks/useOrder';
import { getAuthToken } from '../utils/auth';
import Navbar from '../components/Navbar';

function Checkout() {
    const cart = useSelector((state) => state.Cart.cartItems);
    const productList = useSelector((state) => state.Products.ProductsData);

    const initialOrderData = {
        userId: '',
        products: [],
        paymentMethod: 'Cash on delivery',
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
        },
    };

    const [orderData, setOrderData] = useState(initialOrderData);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { error, loading, createOrder } = useOrder();

    useEffect(() => {
        handleAuthentication();
        populateProductDetails();
    }, [cart, productList]);

    const handleAuthentication = async () => {
        const token = await getAuthToken();
        if (token) {
            const decodedToken = jwtDecode(token);
            setOrderData((prevData) => ({ ...prevData, userId: decodedToken.userId }));
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const populateProductDetails = () => {
        const products = cart.map((cartItem) => {
            const product = productList.find((p) => p._id === cartItem.id); // Ensure IDs match
            return product ? { productId: product._id, quantity: cartItem.quantity } : null;
        }).filter(Boolean);

        setOrderData((prevData) => ({ ...prevData, products }));
    };

    const handleShippingAddressChange = (e) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            shippingAddress: {
                ...prevData.shippingAddress,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        if (isAuthenticated) {
            console.log('Submitting Order Data: ', orderData); // Log order data
            try {
                const response = await createOrder(orderData);
                console.log('Order created successfully:', response);
                // Show success message
                setSuccessMessage('Order placed successfully! Thank you for your purchase.');
                // Reset order data to initial state
                setOrderData(initialOrderData);
                // Clear success message after a few seconds (optional)
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error creating order:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                {isAuthenticated ? (
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                        {successMessage && (
                            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md">
                                {successMessage}
                            </div>
                        )}
                        <div className="space-y-4">
                            {cart.map((cartItem) => {
                                const product = productList.find((p) => p._id === cartItem.id);
                                return product ? (
                                    <div key={product._id} className="flex items-center p-4 border rounded-lg shadow-sm">
                                        <img 
                                            src={`data:image/jpeg;base64,${product.image}`}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-lg mr-4"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{product.title}</h3>
                                            <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>

                        {/* Shipping Address */}
                        <div className="mt-6">
                            <h4 className="font-medium mb-2">Shipping Address</h4>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={orderData.shippingAddress.address}
                                onChange={handleShippingAddressChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={orderData.shippingAddress.city}
                                onChange={handleShippingAddressChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={orderData.shippingAddress.state}
                                onChange={handleShippingAddressChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                value={orderData.shippingAddress.postalCode}
                                onChange={handleShippingAddressChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={orderData.shippingAddress.country}
                                onChange={handleShippingAddressChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="mt-6">
                            <h4 className="font-medium mb-2">Payment Method</h4>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on delivery"
                                    checked={orderData.paymentMethod === "Cash on delivery"}
                                    onChange={(e) =>
                                        setOrderData({ ...orderData, paymentMethod: e.target.value })
                                    }
                                    className="form-radio text-indigo-600"
                                />
                                <span>Cash on Delivery</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            onClick={handleSubmit} 
                            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Place Order
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 font-medium">Please login to place an order.</p>
                )}
            </div>
        </>
    );
}

export default Checkout;
