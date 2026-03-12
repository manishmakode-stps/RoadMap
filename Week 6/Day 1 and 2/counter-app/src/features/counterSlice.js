import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    count : 0
}

export const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        updateCount : (state, action) => {
           switch(action.payload){
            case 'increment' : 
                state.count += 1
                break;
            case 'decrement' : 
                state.count -= 1
                break;
            case 'reset' : 
                state.count = 0
                break;
            default : 
                state.count = state.count
           }
        },
        
    }
})

export const {updateCount} = counterSlice.actions
export default counterSlice.reducer