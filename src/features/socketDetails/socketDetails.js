import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socketID : ""
}

const socketDetailsSlice = createSlice({
    name: "socketDetails",
    initialState,
    reducers : {
        setSocketID : (state, action) => {
            state.socketID = action.payload;
        }
    }
})

export default socketDetailsSlice.reducer;
export const {setSocketID} = socketDetailsSlice.actions
