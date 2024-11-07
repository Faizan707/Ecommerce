import { createSlice } from "@reduxjs/toolkit"
const initialState ={
    orderData : []
}

const orderSlice = createSlice(
    {
        name :"order",
        initialState,
        reducers: {
            addOrder: (state,action) =>{
                state.orderData =action.payload
            }
        }
    }
    
) 

export const {addOrder} = orderSlice.actions
export default orderSlice.reducer