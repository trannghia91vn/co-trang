import { createSlice } from "@reduxjs/toolkit";

const initLoading = {
    isLoading : false,
}

const LoadingSlice = createSlice({
    name : 'Loading Slice',
    initialState : initLoading,
    reducers : {
        activeLoading(state){
            state.isLoading = true;
        },
        deactiveLoading(state){
            state.isLoading = false;
        }
    }
})

export const LoadingActions = LoadingSlice.actions;

export default LoadingSlice.reducer;