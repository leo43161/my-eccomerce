import { createSlice } from "@reduxjs/toolkit";
import productsCart from "../../Data/cart.json"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            user: "Usuario Hard",
            updatedAt: "",
            total: productsCart.reduce(
                (acc, currentItem) => acc += currentItem.price * currentItem.quantity,
                0
            ),
            items: productsCart
        }
    },
    reducers: {
        addProduct: (state, action) => {
            /* state.value.productsSelected = state.value.productsCart.filter(product => product.category === action.payload.name)
            state.value.categorySelected = action.payload */
        },
    }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;