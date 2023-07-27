import { createSlice } from "@reduxjs/toolkit";
import Orders from "../../Data/orders.json"

export const ordersSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            allOrders: Orders,
            total: Orders.length
        }
    },
    reducers: {
        addOrders: (state, action) => {
            /* state.value.productsSelected = state.value.productsCart.filter(product => product.category === action.payload.name)
            state.value.categorySelected = action.payload */
        },
    }
});

export const { addOrders } = ordersSlice.actions;
export default ordersSlice.reducer;