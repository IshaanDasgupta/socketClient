import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId : "",
    profilePic: ""
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload;
        },
        setProfilePic : (state , action) => {
            state.profilePic = action.payload;
        }
    }
})

export default userDetailsSlice.reducer;
export const {setUserId , setProfilePic} = userDetailsSlice.actions
