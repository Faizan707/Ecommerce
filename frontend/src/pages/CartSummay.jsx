import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from "react-icons/md";
import { addItems, removeItems } from '../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../routes/routes';

function CartSummary({ onClose }) {
    const cartItems = useSelector((state) => state.Cart.cartItems);
    const products = useSelector((state) => state.Products.ProductsData);
    
    const dispatch = useDispatch();

    const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));

    useEffect(() => {
        setQuantities(cartItems.map(item => item.quantity));
    }, [cartItems]);

    const handleRemoveItems = (id) => {
        dispatch(removeItems({ id })); 
    };

    const increaseQuantity = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            newQuantities[index] += 1;
            return newQuantities;
        });
    };

    const decreaseQuantity = (index) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            if (newQuantities[index] > 1) {
                newQuantities[index] -= 1;
            }
            return newQuantities;
        });
    };

    const handleAddToCart = (index) => {
        const item = cartItems[index];
        const quantity = quantities[index];
        if (quantity) {
            dispatch(addItems({
                id: item.id,
                title: products.find(prod => prod._id === item.id)?.title,
                quantity,
            }));
        }
    };
    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate(PAGES.Cart)
    }    


    return (
        <div className="w-[100%] lg:w-[580px] h-auto bg-white shadow-xl rounded-lg absolute right-0 top-[4rem] p-4 ">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h3 className="  text-lg font-semibold text-gray-700">Your Cart</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                    <MdClose size={24} />
                </button>
            </div>

            <ul className="pt-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        const product = products.find((prod) => prod._id === item.id);
                        const imageUrl = product?.image 
                            ? `data:image/jpeg;base64,${product.image}`
                            : "default-image-url.jpg";

                        return (
                            <li key={item.id || index} className="flex flex-col gap-6 md:flex-row items-center md:justify-between border-b border-gray-200 py-3 space-y-2 md:space-y-0">
                                <img
                                    src={imageUrl}
                                    alt={product?.title || "Product Image"}
                                    className="w-12 h-12 object-cover rounded-md mr-3"
                                />
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{product?.title || "Unknown Product"}</p>
                                    <p className="text-gray-500 text-sm">Quantity: {quantities[index]}</p>
                                    <span className="text-gray-700 font-semibold">{product?.price || "N/A"} USD</span>

                                </div>
                                <div className="    flex items-center space-x-2 mt-2 mb-4">
                                    <button className="p-2 text-gray-700 hover:bg-gray-200" onClick={() => decreaseQuantity(index)}>
                                        -
                                    </button>
                                    <span className="w-16 text-center border border-gray-300 p-2 text-gray-700">
                                        {quantities[index]}
                                    </span>
                                    <button className="p-2 text-gray-700 hover:bg-gray-200" onClick={() => increaseQuantity(index)}>
                                        +
                                    </button>
                                </div>
                                <button 
                                    onClick={() => handleAddToCart(index)}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 ml-4"
                                >
                                    Add Quantity
                                </button>

                                <button 
                                    className='   ml-4 text-white bg-red-500 hover:bg-red-600 rounded-lg px-2 py-1'
                                    onClick={() => handleRemoveItems(item.id)}
                                >
                                    Remove Item
                                </button>
                            </li>
                        );
                    })
                ) : (
                    <li className="p-4 text-center text-gray-600">Your cart is empty</li>
                )}
            </ul>

            <button
                className="mt-4 w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                onClick={handleNavigate}
            >
                Checkout
            </button>
        </div>
    );
}

export default CartSummary;
