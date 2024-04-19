import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    value: 0
}

export const quantitySlice = createSlice({
    name: 'quantity',
    initialState,
    reducers: {
        addQuantity: (state) => {
            state.value += 1
        },
        removeQuantity: (state) => {
            state.value = state.value - 1 >= 0 ? state.value - 1 : 0
        }
    }
})


export const {addQuantity, removeQuantity} = quantitySlice.actions

export default quantitySlice.reducer