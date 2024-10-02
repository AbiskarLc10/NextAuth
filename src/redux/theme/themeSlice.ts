import { createSlice } from "@reduxjs/toolkit";


export interface Theme {
    mode: string
}

const initialState: Theme = {
    mode: 'dark'
}


export const themeSlice = createSlice({
    name:'theme',
     initialState,
     reducers: {
           toggleTheme : (state) =>{

            state.mode = state.mode==='dark'?'light':'dark'
           }
     }
})

export const {toggleTheme} = themeSlice.actions

export default themeSlice.reducer;