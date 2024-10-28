import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesData: [] 
}

export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categoriesData = action.payload; 
        }
    }
});

export const {addCategory} = CategorySlice.actions
export default CategorySlice.reducer