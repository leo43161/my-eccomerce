import { configureStore } from "@reduxjs/toolkit";
import shopReducer from '../Features/shop/shopSlice'
import cartReducer from '../Features/cart/cartSlice'
import ordersReducer from '../Features/orders/ordersSlice'

export default configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        ordersReducer
    }
})