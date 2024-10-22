import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories : []
}

export const CategorySlice = createSlice({
    initialState,
    reducers:{
        addCategory : (state,action) =>{
            state.categories = action.payload
        }
    }
})
export const {addCategory} = CategorySlice.actions
export default CategorySlice.reducer