import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "./features/categorySlice.js"
export const store = configureStore({
  reducer: {
    categories:categoryReducer
  },
})