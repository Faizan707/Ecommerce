import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    UserData: []
};

const userSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.UserData = action.payload; 
        }
    }
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
