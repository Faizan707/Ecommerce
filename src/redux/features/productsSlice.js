import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    ProductsData :[]
}

const productSlice = createSlice({
    name:"Products",
    initialState,
    reducers: {
        addProducts:(state,action) =>{
            state.ProductsData =action.payload
        }
    }
})
export const {addProducts} =productSlice.actions
export default productSlice.reducer