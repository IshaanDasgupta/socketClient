import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFriend : ""
}

const chatSelectionSlice = createSlice({
    name: "chatSelection",
    initialState,
    reducers : {
        setSelection : (state, action) => {
            state.selectedFriend = action.payload;
        }
    }
})

export default chatSelectionSlice.reducer;
export const {setSelection} = chatSelectionSlice.actions