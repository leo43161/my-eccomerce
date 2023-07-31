import { createSlice } from "@reduxjs/toolkit";

const updateTotal = (state) => {
    state.value.total = state.value.items.reduce(
        (acc, currentItem) => acc += currentItem.price * currentItem.quantity,
        0
    )
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            user: "Usuario Hard",
            updatedAt: "",
            total: null,
            items: []
        }
    },
    reducers: {
        addCartItem: (state, action) => {
            const productExists = state.value.items.some(item => item.id === action.payload.id)
            if (productExists) {
                state.value.items = state.value.items.map(item => {
                    if (item.id === action.payload.id) {
                        item.quantity += action.payload.quantity
                        return item
                    }
                    return item
                })
            } else state.value.items.push(action.payload)

            updateTotal(state);

            state.value.updatedAt = new Date().toLocaleString()
        },
        removeCartItem: (state, action) => {
            state.value.items = state.value.items.filter(item => item.id !== action.payload)
            updateTotal(state);
        },
        addItem: (state, action) => {
            state.value.items = state.value.items.map(item => {
                if (item.id === action.payload) {
                    item.quantity += 1
                    return item
                }
                return item
            })
            updateTotal(state);
        },
        removeItem: (state, action) => {
            state.value.items = state.value.items.map(item => {
                if (item.id === action.payload) {
                    if (item.quantity > 1) {
                        item.quantity -= 1
                        return item
                    }
                }
                return item
            })
            updateTotal(state);
        }
    }
});

export const { addCartItem, removeCartItem, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;