import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], // Load from local storage
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state, action) => {
            const { id, title, quantity } = action.payload;

            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.cartItems.push({ id, title, quantity}); 
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
        },
        removeItems: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },
    }
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
