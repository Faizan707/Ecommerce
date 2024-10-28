import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "./features/categorySlice.js"
import productReducer from "./features/productsSlice.js"
import userReducer from "./features/userSlice.js"
export const store = configureStore({
  reducer: {
    category:categoryReducer,
    Products:productReducer,
    Users:userReducer
  },
})