import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId : ""
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload;
        }
    }
})

export default userDetailsSlice.reducer;
export const {setUserId} = userDetailsSlice.actions
